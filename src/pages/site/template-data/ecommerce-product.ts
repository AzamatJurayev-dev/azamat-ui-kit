import type { TemplateRecord } from "../site-data"

export const ecommerceProductTemplate: TemplateRecord = {
  slug: "ecommerce-product",
  title: "Commerce product",
  eyebrow: "Commerce template",
  summary: "A product-facing commerce layout with media, pricing, option selection and supporting conversion blocks.",
  status: "Draft",
  previewTone: "product",
  navItems: ["Overview", "Gallery", "Variants", "Reviews", "Reports", "Inventory", "Settings"],
  metrics: [
    { label: "Orders", value: "1,429", delta: "+6.1%" },
    { label: "Average order", value: "$83", delta: "+4.2%" },
    { label: "Stock health", value: "92%", delta: "+3.0%" },
  ],
  sections: [
    {
      key: "overview",
      label: "Overview",
      title: "Product overview",
      description: "Lead with gallery, price, trust points and purchase controls in a clean hierarchy.",
      bullets: ["Hero media", "Price stack", "Trust badges", "Primary CTA"],
      statCards: [
        { label: "Units sold", value: "842", meta: "30d" },
        { label: "Return rate", value: "1.8%", meta: "Low" },
        { label: "Conversion", value: "4.9%", meta: "+0.6%" },
      ],
      supportCards: [
        { title: "Gallery stack", text: "Large hero image, thumbs and option switchers stay visually balanced.", status: "Media" },
        { title: "Price hierarchy", text: "Discount, shipping and stock states remain visible near the CTA.", status: "Pricing" },
        { title: "Trust blocks", text: "Warranty, shipping and review summary support conversion.", status: "Trust" },
      ],
    },
    {
      key: "leads",
      label: "Leads",
      title: "Customer interest",
      description: "Surface wishlists, saved carts and subscriber intent around the product page.",
      bullets: ["Saved carts", "Interest list", "Segment chips", "Follow-up CTA"],
      statCards: [
        { label: "Saved carts", value: "214", meta: "+19" },
        { label: "Wishlist adds", value: "348", meta: "+11%" },
        { label: "Back-in-stock", value: "92", meta: "Queued" },
      ],
      supportCards: [
        { title: "Interest segments", text: "Returning visitors, subscribers and warm leads are separated.", status: "Audience" },
        { title: "Recovery prompts", text: "Abandoned cart and saved cart prompts are part of the same system.", status: "Recovery" },
        { title: "Follow-up actions", text: "Email and notification CTA blocks remain visible in context.", status: "CTA" },
      ],
    },
    {
      key: "reports",
      label: "Reports",
      title: "Commerce reporting",
      description: "Summarize revenue, inventory movement and offer performance on the same route family.",
      bullets: ["Revenue cards", "Inventory table", "Offer lifts", "Channel compare"],
      statCards: [
        { label: "Revenue", value: "$68.2k", meta: "+7.4%" },
        { label: "Bundle lift", value: "14%", meta: "Offer" },
        { label: "Sell-through", value: "76%", meta: "Monthly" },
      ],
      supportCards: [
        { title: "Inventory rows", text: "Variant stock, reserve count and reorder state appear together.", status: "Inventory" },
        { title: "Offer compare", text: "Discount and bundle performance use the same reporting scaffold.", status: "Offer" },
        { title: "Channel split", text: "Marketplace, direct and social commerce are shown side by side.", status: "Channels" },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      title: "Catalog settings",
      description: "Edit options, shipping rules and featured modules through a consistent settings screen.",
      bullets: ["Variant config", "Shipping rules", "Featured slots", "Content ordering"],
      statCards: [
        { label: "Variants", value: "12", meta: "3 sizes" },
        { label: "Shipping zones", value: "5", meta: "Global" },
        { label: "Featured slots", value: "4", meta: "Homepage" },
      ],
      supportCards: [
        { title: "Variant editor", text: "Color, size and SKU management align with the rest of the docs system.", status: "Variants" },
        { title: "Shipping rules", text: "Thresholds, regions and express methods are visible in one stack.", status: "Shipping" },
        { title: "Merch slots", text: "Editors can control placement for featured and related products.", status: "Merch" },
      ],
    },
  ],
  modules: [
    { label: "Button docs", href: "/docs/components/button" },
    { label: "Button playground", href: "/playground/button" },
    { label: "Blocks catalog", href: "/blocks" },
  ],
  notes: [
    "Commerce surfaces need pricing, option selection and supporting trust blocks to feel complete and production-like.",
    "This record is also prepared for richer nested sections so blocks and templates can keep sharing one data model.",
  ],
}
