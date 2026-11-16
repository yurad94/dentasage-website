# 产品详情页图片更换指南

> 路径：点击 "View Products" → 点击产品卡片 → 进入产品详情页
> 网址：`/products/dentasage-sharp-mirror`

---

## 产品详情页有 3 类图片

### 第 1 类：产品主图 + 画廊（4 种颜色各 2 张）

这是详情页顶部最大的图片区域。切换颜色时图片会跟着变。

| 颜色 | 主图（大图） | 画廊第 2 张（小图） |
|------|-------------|-------------------|
| Surgical Grey | `hero-product-grey.jpg` | `product-grey-card.jpg` |
| Matte Black | `hero-product-black.jpg` | `product-black-card.jpg` |
| Signal Orange | `hero-product-orange.jpg` | `product-orange-card.jpg` |
| Magenta Pink | `hero-product-pink.jpg` | `product-pink-card.jpg` |

**存放目录：**
```
public/images/generated/
```

**换法：用同名文件覆盖即可，不用改任何代码**

---

### 第 2 类：360° 旋转图（36 张连续帧）

详情页中部的 360° 查看器，由 36 张帧图片组成，拖动可旋转。

**存放目录：**
```
public/images/products/dentasage-sharp-mirror/360/
```

**文件名：** `frame-001.jpg` ~ `frame-036.jpg`

> ⚠️ 如果你暂时没有 360° 旋转素材，这 36 张图可以保持现状。后续有素材了再替换。
> 替换时需要 36 张文件名完全一致的图片（frame-001 到 frame-036）。

---

### 第 3 类：着陆页 4 色展示区块

着陆页底部的 4 色卡片也引用的是第 1 类的主图，所以**换主图时着陆页会自动更新**，不需要额外操作。

---

## 具体操作方法

### 方法 A：GitHub 网页上传（推荐，无需命令行）

1. 打开：https://github.com/yurad94/dentasage-website
2. 依次进入 `public` → `images` → `generated`
3. 点击右上角 **Add file** → **Upload files**
4. 把你的新图片拖进去
5. **⚠️ 关键：文件名必须和原来完全一致**（比如灰色主图必须叫 `hero-product-grey.jpg`）
6. 在下方填写说明（随便写，比如 "update grey image"）
7. 点击绿色的 **Commit changes** 按钮
8. 等 1-2 分钟，Vercel 自动部署完成
9. 用预览链接查看效果：`https://www.dentasage.com/?preview=dentasage-admin-2026`

### 方法 B：命令行推送

```bash
cd dentasage-website

# 替换灰色产品图
cp 你的新图片.jpg public/images/generated/hero-product-grey.jpg
cp 你的新卡片图.jpg public/images/generated/product-grey-card.jpg

# 提交并推送
git add public/images/generated/
git commit -m "Update grey product images"
git push origin main
```

### 方法 C：用不同文件名（需要改代码）

如果你想用全新的文件名，需要同时修改 `src/lib/data/products.ts`：

```typescript
// 打开 src/lib/data/products.ts
// 找到对应颜色，修改 mainImage 和 gallery 路径

{
  id: "grey",
  name: "Surgical Grey",
  hex: "#8a8d91",
  mainImage: "/images/generated/你的新文件名.jpg",  // ← 改这里
  gallery: [
    "/images/generated/你的新文件名.jpg",            // ← 大图
    "/images/generated/你的新卡片文件名.jpg",        // ← 小图
  ],
},
```

然后提交推送：
```bash
git add public/images/generated/你的新文件名.jpg src/lib/data/products.ts
git commit -m "Add new grey product images"
git push origin main
```

---

## 图片建议规格

| 用途 | 建议尺寸 | 格式 | 背景 |
|------|---------|------|------|
| 产品主图（hero-product-*） | 800×800 px 或更大 | JPG | 纯色或透明 |
| 产品卡片（product-*-card） | 600×600 px | JPG | 纯色 |
| 360 帧（frame-001~036） | 600×600 px | JPG | 纯色 |
| Logo | 宽 220px+ | PNG | 透明 |

> 产品主图建议用正方形（1:1），背景统一纯色或透明，这样在详情页里展示效果最好。

---

## 总结：你只需要记住

| 你想换什么 | 换哪个文件 | 在哪个目录 |
|-----------|-----------|-----------|
| 灰色产品图 | `hero-product-grey.jpg` + `product-grey-card.jpg` | `public/images/generated/` |
| 黑色产品图 | `hero-product-black.jpg` + `product-black-card.jpg` | `public/images/generated/` |
| 橙色产品图 | `hero-product-orange.jpg` + `product-orange-card.jpg` | `public/images/generated/` |
| 粉色产品图 | `hero-product-pink.jpg` + `product-pink-card.jpg` | `public/images/generated/` |
| 360旋转图 | `frame-001.jpg` ~ `frame-036.jpg` | `public/images/products/dentasage-sharp-mirror/360/` |
| Logo | `logo-dentasage-light.png` | `public/images/generated/` |

**用同名文件覆盖 → 推送到 GitHub → 自动生效。不需要改代码。**
