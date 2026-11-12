#!/usr/bin/env python3
"""
把产品图重新着色：
- 浅蓝色 → 灰色 (Grey)
- 粉红色 → 橙色 (Orange)
保留镜面反光区域，避免过度着色。
"""
import os
from pathlib import Path
from PIL import Image
import numpy as np

ROOT = Path("/workspace/dentasage")
SRC = ROOT / "public/images/generated"
OUT = SRC


def load_rgba(path: str) -> Image.Image:
    return Image.open(path).convert("RGBA")


def save(img: Image.Image, path: Path):
    img.save(path, quality=95)
    print(f"Saved {path}")


def to_gray(img: Image.Image) -> Image.Image:
    """把蓝色/蓝灰色手柄变成中性灰，保留镜面。"""
    arr = np.array(img).astype(np.float32)
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

    # 只处理不透明的产品区域
    mask = (a > 20)

    # 定义蓝色/蓝灰色的色相区域：B 明显高于 R 和 G
    is_blueish = (b > r + 15) & (b > g + 5) & mask
    # 镜面反光区：亮度很高、接近白色，不做处理
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    is_mirror = (luminance > 200) & (np.abs(r - g) < 25) & (np.abs(g - b) < 25) & mask

    # 只把蓝色区域变成灰色
    target = is_blueish & ~is_mirror

    # 灰色 = R=G=B = 当前亮度
    gray = luminance.copy()
    # 偏冷一点的器械灰（轻微降低）
    gray[target] = gray[target] * 0.92

    arr[:, :, 0] = np.where(target, gray, r)
    arr[:, :, 1] = np.where(target, gray, g)
    arr[:, :, 2] = np.where(target, gray, b)

    arr = np.clip(arr, 0, 255).astype(np.uint8)
    return Image.fromarray(arr)


def to_orange(img: Image.Image) -> Image.Image:
    """把玫红/粉红色手柄变成橙色，保留镜面。"""
    arr = np.array(img).astype(np.float32)
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

    mask = (a > 20)
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    is_mirror = (luminance > 200) & (np.abs(r - g) < 25) & (np.abs(g - b) < 25) & mask

    # 粉红色/玫红：R 高，B 明显高于 G
    is_pinkish = (r > g + 10) & (b > g + 10) & (r > 80) & mask
    target = is_pinkish & ~is_mirror

    # 目标橙色：提高 R，降低 B，G 取中间
    # 用 HSL 思路：保持亮度，把色相转到橙色
    lum = luminance[target]
    new_r = np.clip(lum * 1.18, 0, 255)
    new_g = np.clip(lum * 0.62, 0, 255)
    new_b = np.clip(lum * 0.22, 0, 255)

    arr[:, :, 0][target] = new_r
    arr[:, :, 1][target] = new_g
    arr[:, :, 2][target] = new_b

    arr = np.clip(arr, 0, 255).astype(np.uint8)
    return Image.fromarray(arr)


def make_hero_bg(product_path: Path, out_path: Path):
    """生成浅灰渐变背景的 Hero 展示图（1600x900），产品右侧居中。"""
    product = Image.open(product_path).convert("RGBA")

    # 创建浅灰渐变背景
    W, H = 1600, 900
    bg = Image.new("RGB", (W, H), (245, 245, 247))
    # 微妙渐变：左上稍亮
    arr = np.array(bg)
    y_grad = np.linspace(0, 8, H)[:, None]
    x_grad = np.linspace(0, 5, W)[None, :]
    arr = np.clip(arr + y_grad[:, :, None] + x_grad[:, :, None], 0, 255).astype(np.uint8)
    bg = Image.fromarray(arr)

    # 缩放产品并居中偏右
    scale = 0.75
    pw = int(product.width * scale)
    ph = int(product.height * scale)
    product = product.resize((pw, ph), Image.LANCZOS)

    x = W - pw - 120
    y = (H - ph) // 2
    bg.paste(product, (x, y), product)
    bg.save(out_path, quality=95)
    print(f"Saved hero {out_path}")


def make_card_bg(product_path: Path, out_path: Path, size=(800, 800)):
    """生成 1:1 产品卡片图，浅灰背景，产品居中。"""
    product = Image.open(product_path).convert("RGBA")
    W, H = size
    bg = Image.new("RGB", (W, H), (245, 245, 247))

    scale = min(W * 0.85 / product.width, H * 0.85 / product.height)
    pw = int(product.width * scale)
    ph = int(product.height * scale)
    product = product.resize((pw, ph), Image.LANCZOS)

    x = (W - pw) // 2
    y = (H - ph) // 2
    bg.paste(product, (x, y), product)
    bg.save(out_path, quality=95)
    print(f"Saved card {out_path}")


if __name__ == "__main__":
    # 1. 重新着色
    grey = to_gray(load_rgba(SRC / "product-grey.png"))
    save(grey, OUT / "product-grey-recolored.png")

    orange = to_orange(load_rgba(SRC / "product-pink.png"))
    save(orange, OUT / "product-orange-recolored.png")

    # 2. 生成新颜色对应的各种尺寸图
    colors = [
        ("grey", OUT / "product-grey-recolored.png"),
        ("black", SRC / "product-black.png"),
        ("orange", OUT / "product-orange-recolored.png"),
        ("pink", SRC / "product-orange.png"),  # 原有橙红色当 Magenta Pink
    ]

    # 最终命名统一
    final_map = {
        "grey": OUT / "product-grey-final.png",
        "black": OUT / "product-black-final.png",
        "orange": OUT / "product-orange-final.png",
        "pink": OUT / "product-pink-final.png",
    }

    for name, src in colors:
        # 统一输出为最终命名
        img = Image.open(src)
        img.save(final_map[name])
        print(f"Final {name}: {final_map[name]}")

        # Hero
        make_hero_bg(final_map[name], OUT / f"hero-product-{name}.jpg")
        # Card
        make_card_bg(final_map[name], OUT / f"product-{name}-card.jpg")
