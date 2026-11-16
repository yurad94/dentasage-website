# DENTASAGE 网站图片更换指南

## 方式一：直接替换文件（最简单）

### 产品图片（4种颜色）

产品图片存放在：
```
public/images/generated/
```

| 颜色 | 产品主图 | 卡片图 |
|------|---------|--------|
| Surgical Grey | `hero-product-grey.jpg` | `product-grey-card.jpg` |
| Matte Black | `hero-product-black.jpg` | `product-black-card.jpg` |
| Signal Orange | `hero-product-orange.jpg` | `product-orange-card.jpg` |
| Magenta Pink | `hero-product-pink.jpg` | `product-pink-card.jpg` |

**更换步骤：**

1. 准备好新图片（建议尺寸 800×800 或更大，JPG/PNG 均可）
2. 用新图片**覆盖同名文件**（文件名必须完全一致）
3. 提交到 GitHub：
   ```bash
   git add public/images/generated/hero-product-grey.jpg
   git commit -m "Update grey product image"
   git push origin main
   ```
4. Vercel 会自动重新部署（约 1-2 分钟）

### Logo

| 位置 | 文件 |
|------|------|
| 着陆页（浅色背景） | `public/images/generated/logo-dentasage-light.png` |
| 深色背景备用 | `public/images/generated/logo-dentasage-dark.png` |

---

## 方式二：通过 GitHub 网页直接上传（无需命令行）

1. 打开 https://github.com/yurad94/dentasage-website
2. 进入 `public/images/generated/` 目录
3. 点击 **Add file → Upload files**
4. 拖入新图片（确保文件名和原来的**完全一致**）
5. 填写 Commit message，点击 **Commit changes**
6. Vercel 自动部署，1-2 分钟后生效

---

## 方式三：换不同文件名的新图片

如果你想用全新文件名（不想覆盖旧文件），需要同时修改数据文件：

打开 `src/lib/data/products.ts`，找到对应颜色的 `mainImage` 和 `gallery` 路径，改成新文件名：

```typescript
{
  id: "grey",
  name: "Surgical Grey",
  hex: "#8a8d91",
  mainImage: "/images/generated/你的新文件名.jpg",  // ← 改这里
  gallery: [
    "/images/generated/你的新文件名.jpg",
    "/images/generated/你的新卡片图.jpg",
  ],
},
```

然后提交推送即可。

---

## 着陆页产品区块图片

着陆页的 4 色展示区块直接引用 `hero-product-{颜色}.jpg`，所以只要替换这些文件，着陆页也会自动更新。

---

## 预览部署效果

部署后用预览链接查看（网站对公众显示"建设中"）：

```
https://www.dentasage.com/?preview=dentasage-admin-2026
```

这个链接会设置一个 30 天有效的预览 Cookie，之后访问任何页面都能看到完整内容。

---

## 图片建议规格

| 用途 | 尺寸 | 格式 | 背景 |
|------|------|------|------|
| 产品主图 (hero-product-*) | 800×800+ | JPG | 透明或纯色 |
| 产品卡片 (product-*-card) | 600×600 | JPG | 纯色 |
| Logo | 宽 220+ | PNG | 透明 |
| 临床场景 (clinical-*) | 1200×800 | JPG | — |
