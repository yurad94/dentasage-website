from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
import os
from rembg import remove

# 目录设置
UPLOADS = "/root/uploads"
OUT = "/workspace/dentasage/public/images/generated"
os.makedirs(OUT, exist_ok=True)

# 页面风格色
BG_LIGHT = (245, 244, 242)  # 浅灰白背景
BG_WARM  = (250, 248, 245)  # 暖白

def open_rgb(path):
    img = Image.open(path)
    if img.mode != "RGB":
        img = img.convert("RGB")
    return img

def resize_fit(img, max_w, max_h, resample=Image.LANCZOS):
    ratio = min(max_w / img.width, max_h / img.height)
    new_w = max(1, int(img.width * ratio))
    new_h = max(1, int(img.height * ratio))
    return img.resize((new_w, new_h), resample)

def resize_cover(img, w, h, resample=Image.LANCZOS):
    ratio = max(w / img.width, h / img.height)
    new_w, new_h = int(img.width * ratio), int(img.height * ratio)
    img = img.resize((new_w, new_h), resample)
    left = (img.width - w) // 2
    top = (img.height - h) // 2
    return img.crop((left, top, left + w, top + h))

def remove_bg(path):
    """使用 rembg 去除背景"""
    img = open_rgb(path)
    return remove(img)

def make_product_card(src_path, out_path, size=1200, bg=BG_LIGHT, padding=100):
    """1:1 产品展示卡，透明背景合成到统一背景"""
    img = remove_bg(src_path)
    canvas = Image.new("RGB", (size, size), bg)
    # 缩放并居中
    prod = resize_fit(img, size - padding*2, size - padding*2)
    x = (size - prod.width) // 2
    y = (size - prod.height) // 2
    canvas.paste(prod, (x, y), prod)
    canvas.save(out_path, "JPEG", quality=95)
    print(f"Saved: {out_path}")

def make_hero_product(src_path, out_path, w=1920, h=1080, bg=BG_LIGHT, product_w_ratio=0.65, align="right"):
    """Hero banner：单个产品展示，右侧或居中"""
    img = remove_bg(src_path)
    canvas = Image.new("RGB", (w, h), bg)
    prod = resize_fit(img, int(w * product_w_ratio), int(h * 0.85))
    if align == "right":
        x = w - prod.width - 120
    elif align == "left":
        x = 120
    else:
        x = (w - prod.width) // 2
    y = (h - prod.height) // 2
    canvas.paste(prod, (x, y), prod)
    canvas.save(out_path, "JPEG", quality=95)
    print(f"Saved: {out_path}")

def make_scene_banner(src_path, out_path, w=1920, h=1080, brightness=1.05, overlay_alpha=40):
    """场景图 banner"""
    img = open_rgb(src_path)
    img = resize_cover(img, w, h)
    from PIL import ImageEnhance
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(brightness)
    overlay = Image.new("RGBA", (w, h), (250, 248, 245, overlay_alpha))
    img_rgba = img.convert("RGBA")
    blended = Image.alpha_composite(img_rgba, overlay).convert("RGB")
    blended.save(out_path, "JPEG", quality=95)
    print(f"Saved: {out_path}")

def make_color_collection(src_paths, out_path, w=2400, h=1200, bg=BG_LIGHT):
    """颜色选择器大图：4色产品整齐排列"""
    canvas = Image.new("RGB", (w, h), bg)
    n = len(src_paths)
    gap = 60
    cell_w = (w - gap*(n+1)) // n
    cell_h = h - gap*2
    for i, path in enumerate(src_paths):
        img = remove_bg(path)
        # 统一缩放：让所有产品视觉高度接近
        prod = resize_fit(img, cell_w - 40, cell_h - 120)
        x = gap + i*(cell_w + gap) + (cell_w - prod.width)//2
        y = gap + (cell_h - prod.height)//2
        canvas.paste(prod, (x, y), prod)
    canvas.save(out_path, "JPEG", quality=95)
    print(f"Saved: {out_path}")

def make_logo(out_path_light, out_path_dark, w=600, h=120):
    """生成 DENTASAGE logo：左侧箭头图形 + 右侧文字"""
    # 箭头图形路径（从原logo提取的抽象箭头）
    # 使用一个简洁的右箭头，类似原logo的绿色部分
    arrow_color = (43, 122, 120)  # 青绿色，匹配临床风格
    text_color_light = (28, 28, 30)
    text_color_dark = (245, 244, 242)
    
    def create_logo(text_color, bg_color):
        canvas = Image.new("RGBA", (w, h), bg_color if isinstance(bg_color, tuple) and len(bg_color)==4 else (*bg_color, 255))
        draw = ImageDraw.Draw(canvas)
        
        # 绘制箭头图形
        arrow_w, arrow_h = 50, 60
        ax, ay = 30, (h - arrow_h) // 2
        # 主体矩形
        draw.polygon([
            (ax, ay + arrow_h*0.2),
            (ax + arrow_w*0.55, ay + arrow_h*0.2),
            (ax + arrow_w*0.55, ay),
            (ax + arrow_w, ay + arrow_h*0.5),
            (ax + arrow_w*0.55, ay + arrow_h),
            (ax + arrow_w*0.55, ay + arrow_h*0.8),
            (ax, ay + arrow_h*0.8),
        ], fill=arrow_color)
        
        # 绘制文字
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 56)
        except:
            font = ImageFont.load_default()
        text = "DENTASAGE"
        bbox = draw.textbbox((0,0), text, font=font)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]
        tx = ax + arrow_w + 25
        ty = (h - text_h) // 2 - 4
        draw.text((tx, ty), text, fill=text_color, font=font)
        
        return canvas
    
    # 浅色背景版
    logo_light = create_logo(text_color_light, (245, 244, 242, 0))
    logo_light.save(out_path_light, "PNG")
    print(f"Saved: {out_path_light}")
    
    # 深色背景版
    logo_dark = create_logo(text_color_dark, (30, 30, 32, 0))
    logo_dark.save(out_path_dark, "PNG")
    print(f"Saved: {out_path_dark}")

# ================== 执行 ==================

# 1. Logo
make_logo(f"{OUT}/logo-dentasage-light.png", f"{OUT}/logo-dentasage-dark.png", w=600, h=120)

# 2. 产品白底图（rembg 去背景后合成）
products = {
    "grey":  "/root/uploads/1794400490603420140-1794400440084-kli8k2y1-product_不同角度3.jpeg",
    "black": "/root/uploads/1794400490961076955-1794400440086-9amirxqp-product_选色效果图.jpeg",
    "orange": "/root/uploads/1794400490563658524-1794400441278-l0lmpgh8-product_不同角度2.png",
    "pink":  "/root/uploads/1794400490644446146-1794400440085-qewmudjv-product_不同角度4.jpeg",
}
for color, path in products.items():
    make_product_card(path, f"{OUT}/product-{color}-card.jpg", size=1200, bg=BG_LIGHT)
    make_hero_product(path, f"{OUT}/hero-product-{color}.jpg", w=1920, h=1080, bg=BG_LIGHT, align="right")
    # 透明 PNG
    img = remove_bg(path)
    img = resize_fit(img, 1600, 1600)
    img.save(f"{OUT}/product-{color}.png", "PNG")
    print(f"Saved: {OUT}/product-{color}.png")

# 3. 颜色选择器组合图
make_color_collection(
    [products[c] for c in ["grey", "black", "orange", "pink"]],
    f"{OUT}/color-collection-clean.jpg",
    w=2400, h=1200, bg=BG_LIGHT
)

# 4. 场景图 banner
scene_files = [
    "/root/uploads/1794400491047998736-1794400440645-pln4s12g-product详情页.jpeg",
    "/root/uploads/1794400491097586482-1794400440087-okyh223o-product详情页2.jpeg",
    "/root/uploads/1794400491132328606-1794400441152-08bkm35e-product详情页3.jpeg",
    "/root/uploads/1794400491177872847-1794400440087-t0c5mt5y-product详情页4.jpeg",
    "/root/uploads/1794400491216228540-1794400441187-b4diynth-product详情页5.jpeg",
    "/root/uploads/1794400491249483987-1794400440606-9t4k7a75-product详情页6.jpeg",
]
for i, path in enumerate(scene_files, 1):
    make_scene_banner(path, f"{OUT}/clinical-{i}.jpg", w=1920, h=1080)

# 5. 细节图
make_product_card("/root/uploads/1794400490702532226-1794400441431-vrsmzh2m-product_细节图.png", f"{OUT}/detail-mirror-card.jpg", size=1200, bg=BG_WARM)
make_product_card("/root/uploads/1794400490918336017-1794400441408-qpsrqjs8-product_细节图3.png", f"{OUT}/detail-edge-card.jpg", size=1200, bg=BG_WARM)

# 6. 用户设计稿 banner（保留直接使用版本）
banner2 = "/root/uploads/1794400490420714435-1794400440643-2s12g6jf-需要把图片从中间截断分开成为banner.jpeg"
img2 = open_rgb(banner2)
w2, h2 = img2.size
top_half = img2.crop((0, 0, w2, h2 // 2))
bottom_half = img2.crop((0, h2 // 2, w2, h2))
for name, part in [("hero-dental-instruments", top_half), ("hero-color-practice", bottom_half)]:
    ratio = 1920 / part.width
    new_h = int(part.height * ratio)
    part = part.resize((1920, new_h), Image.LANCZOS)
    if new_h >= 1080:
        part = part.crop((0, (new_h - 1080)//2, 1920, (new_h - 1080)//2 + 1080))
    else:
        canvas = Image.new("RGB", (1920, 1080), BG_LIGHT)
        canvas.paste(part, (0, (1080 - new_h)//2))
        part = canvas
    part.save(f"{OUT}/{name}.jpg", "JPEG", quality=95)
    print(f"Saved: {OUT}/{name}.jpg")

print("\nAll images regenerated with clean backgrounds!")
