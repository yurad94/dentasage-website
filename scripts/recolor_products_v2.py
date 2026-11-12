#!/usr/bin/env python3
"""
改进版颜色替换：更干净、鲜亮的橙色。
"""
from pathlib import Path
from PIL import Image
import numpy as np

ROOT = Path("/workspace/dentasage")
SRC = ROOT / "public/images/generated"
OUT = SRC


def load(path):
    return Image.open(path).convert("RGBA")


def to_orange_v2(img: Image.Image) -> Image.Image:
    """把玫红/粉红变成鲜亮橙色。"""
    arr = np.array(img).astype(np.float32)
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

    mask = (a > 30)
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    is_mirror = (luminance > 180) & (np.abs(r - g) < 40) & (np.abs(g - b) < 40) & mask

    # 更宽松地识别粉红色/红色/紫色区域
    is_pinkish = (
        (r > 60) &
        (r > b) &
        ((r - g) > 5) &
        ((b - g) > -20) &
        mask
    )
    target = is_pinkish & ~is_mirror

    # 转成 HSV 再调整色相到橙色区域
    import colorsys
    hsv = np.zeros((arr.shape[0], arr.shape[1], 3), dtype=np.float32)
    for i in range(arr.shape[0]):
        for j in range(arr.shape[1]):
            if target[i, j]:
                rr, gg, bb = r[i, j] / 255.0, g[i, j] / 255.0, b[i, j] / 255.0
                h, s, v = colorsys.rgb_to_hsv(rr, gg, bb)
                # 目标色相 ~ 30-40度（橙色）
                h = 0.075  # ~27度，偏橙
                s = min(s * 1.3 + 0.15, 1.0)
                v = min(v * 1.15, 1.0)
                nr, ng, nb = colorsys.hsv_to_rgb(h, s, v)
                arr[i, j, 0] = nr * 255
                arr[i, j, 1] = ng * 255
                arr[i, j, 2] = nb * 255

    arr = np.clip(arr, 0, 255).astype(np.uint8)
    return Image.fromarray(arr)


def make_hero_bg(product_path, out_path, W=1600, H=900):
    product = Image.open(product_path).convert("RGBA")
    bg = Image.new("RGB", (W, H), (245, 245, 247))
    arr = np.array(bg)
    y_grad = np.linspace(0, 10, H)[:, None]
    x_grad = np.linspace(0, 6, W)[None, :]
    arr = np.clip(arr + y_grad[:, :, None] + x_grad[:, :, None], 0, 255).astype(np.uint8)
    bg = Image.fromarray(arr)

    scale = 0.75
    pw = int(product.width * scale)
    ph = int(product.height * scale)
    product = product.resize((pw, ph), Image.LANCZOS)
    x = W - pw - 120
    y = (H - ph) // 2
    bg.paste(product, (x, y), product)
    bg.save(out_path, quality=95)
    print(f"Saved hero {out_path}")


def make_card_bg(product_path, out_path, size=(800, 800)):
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
    # 重新生成橙色
    orange = to_orange_v2(load(SRC / "product-pink.png"))
    orange.save(OUT / "product-orange-final.png")
    make_hero_bg(OUT / "product-orange-final.png", OUT / "hero-product-orange.jpg")
    make_card_bg(OUT / "product-orange-final.png", OUT / "product-orange-card.jpg")
    print("Orange recolor v2 done")
