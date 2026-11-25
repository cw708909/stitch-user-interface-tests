// All menu content lives here so it can be changed in one place.
// BASE_URL keeps images working both locally and on GitHub Pages.
const image = (name) => `${import.meta.env.BASE_URL}images/${name}`

export const signatureMenu = [
  {
    id: 'truffle-burger',
    name: 'Truffle Angus Burger',
    price: 18.5,
    image: image('truffle-burger.jpg'),
    badge: { text: "Chef's Pick", icon: 'stars', tone: 'dark' },
    description:
      'Prime 200g Black Angus beef patty, toasted Hokkaido brioche, black truffle aioli, melted Gruyère, and caramelized shallot jam.',
    tags: [
      { text: 'Medium-rare', tone: 'neutral' },
      { text: 'Extra Aioli', tone: 'neutral' },
    ],
    trayNote: '$18.50 each • Medium-rare, extra aioli',
    customizeLabel: 'Customize',
    category: 'Mains',
    dietary: ['chef-special'],
  },
  {
    id: 'truffle-fries',
    name: 'Artisan Truffle Fries',
    price: 7.5,
    image: image('truffle-fries.jpg'),
    badge: { text: 'Popular', icon: 'local_fire_department', tone: 'tertiary' },
    description:
      'Triple-cooked Russet potato batons, shaved 24-month Parmigiano-Reggiano, Maldon sea salt, rosemary, and cold-pressed truffle oil.',
    tags: [
      { text: 'Vegetarian', tone: 'green' },
      { text: 'Dip Included', tone: 'neutral' },
    ],
    trayNote: '$7.50 each • Rosemary & parmesan dip',
    customizeLabel: 'No fresh parsley',
    category: 'Sides',
    dietary: ['vegetarian'],
  },
  {
    id: 'ginger-brew',
    name: 'House Craft Ginger Brew',
    price: 5.5,
    image: image('ginger-brew.jpg'),
    badge: { text: 'Handcrafted', tone: 'dark' },
    description:
      'Slow-fermented organic Fijian ginger, infused with Meyer lemon, fresh kaffir lime zest, and raw wildflower honey.',
    tags: [
      { text: 'Alcohol-Free', tone: 'green' },
      { text: 'On Tap', tone: 'neutral' },
    ],
    trayNote: '$5.50 each • Chilled with lime wheel',
    customizeLabel: 'Remove',
    category: 'Drinks',
    dietary: [],
  },
  {
    id: 'salmon-bowl',
    name: 'Smoked Salmon Bowl',
    price: 16,
    image: image('salmon-bowl.jpg'),
    badge: { text: 'Gluten-Free', tone: 'dark' },
    description:
      'Norwegian smoked salmon, organic tri-color quinoa, creamy Hass avocado, charred edamame, and citrus ponzu emulsion.',
    tags: [
      { text: 'High-Protein', tone: 'neutral' },
      { text: 'Dairy-Free', tone: 'neutral' },
    ],
    footerNote: '420 kcal',
    category: 'Bowls',
    dietary: ['gluten-free'],
  },
  {
    id: 'polenta-bites',
    name: 'Crispy Polenta Bites',
    price: 8,
    image: image('polenta-bites.jpg'),
    badge: { text: 'Vegetarian', tone: 'dark' },
    description:
      'Stone-ground heirloom corn polenta cubes, fried crisp with fresh sage, smoked sea salt, and a sun-dried tomato romesco dip.',
    tags: [
      { text: 'Vegetarian', tone: 'green' },
      { text: 'Gluten-Free', tone: 'neutral' },
    ],
    footerNote: 'Sharing Plate',
    category: 'Sides',
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu Parfait',
    price: 9.5,
    image: image('tiramisu.jpg'),
    badge: { text: 'House Special', tone: 'dark' },
    description:
      'House-baked savoiardi dipped in single-origin cold brew, whipped organic mascarpone, and Valrhona 70% dark chocolate curls.',
    tags: [
      { text: 'House Made', tone: 'neutral' },
      { text: 'Vegetarian', tone: 'neutral' },
    ],
    footerNote: 'Sweet Finish',
    category: 'Desserts',
    dietary: ['vegetarian'],
  },
]

export const signatureCategories = [
  'All Items (28)',
  'Artisanal Burgers & Mains',
  'Fresh Bowls & Greens',
  'Wood-Fired Sides',
  'Handcrafted Drinks',
  'House Desserts',
]

export const signatureDietaryFilters = [
  { label: 'Vegetarian', icon: 'eco', key: 'vegetarian' },
  { label: 'Gluten-Free', icon: 'spa', key: 'gluten-free' },
  { label: 'Chef Special', icon: 'stars', key: 'chef-special' },
  { label: 'Nut-Free', icon: 'psychiatry', key: 'nut-free' },
]

export const pizzaMenu = [
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    price: 12.95,
    image: image('pepperoni-pizza.jpg'),
    badge: { text: 'Customer Favorite', icon: 'local_fire_department', tone: 'dark' },
    description:
      'Crispy cupped artisan pepperoni, fresh mozzarella, San Marzano tomato sauce on rustic sourdough crust.',
    sizes: [
      { label: 'Large', price: 12.95 },
      { label: 'Medium', price: 10 },
      { label: 'Small', price: 7 },
    ],
    defaultSize: 'Large',
    category: 'Pizzas',
    trayNote: 'Thin & crispy crust',
    receiptNote: 'Size: Large',
  },
  {
    id: 'cheese-pizza',
    name: 'Cheese Pizza',
    price: 9.25,
    image: image('cheese-pizza.jpg'),
    badge: { text: 'Vegetarian', icon: 'eco', tone: 'tertiary' },
    description:
      'Classic golden blend of bubbling whole-milk mozzarella, aged provolone, and crushed herb tomato passata.',
    sizes: [
      { label: 'Large', price: 10.95 },
      { label: 'Medium', price: 9.25 },
      { label: 'Small', price: 6.5 },
    ],
    defaultSize: 'Medium',
    category: 'Pizzas',
    trayNote: 'Classic cheese',
    receiptNote: 'Size: Medium',
  },
  {
    id: 'eggplant-pizza',
    name: 'Eggplant Pizza',
    price: 11.95,
    image: image('eggplant-pizza.jpg'),
    badge: { text: 'Chef Special', icon: 'stars', tone: 'dark' },
    description:
      'Tender roasted heirloom eggplant, torn fresh basil, toasted pine nuts, and buffalo mozzarella over wood-fired crust.',
    sizes: [
      { label: 'Large', price: 11.95 },
      { label: 'Medium', price: 9.75 },
      { label: 'Small', price: 6.75 },
    ],
    defaultSize: 'Large',
    wide: true,
    category: 'Pizzas',
    trayNote: 'Extra basil',
    receiptNote: 'Size: Large',
  },
  {
    id: 'fries',
    name: 'Fries',
    price: 4.5,
    icon: 'restaurant',
    iconTone: 'primary',
    description: 'Crispy golden seasoned fries served with house dipping sauce.',
    sizes: [
      { label: 'Large', price: 4.5 },
      { label: 'Small', price: 3.5 },
    ],
    defaultSize: 'Large',
    category: 'Sides',
    trayNote: 'Crispy well-done',
    receiptNote: 'Size: Large',
  },
  {
    id: 'greek-salad',
    name: 'Greek Salad',
    price: 7.25,
    icon: 'eco',
    iconTone: 'tertiary',
    description:
      'Crisp romaine, Kalamata olives, cucumbers, vine tomatoes, and authentic feta cheese with Greek vinaigrette.',
    tags: [
      { text: 'Standard Portion', tone: 'neutral' },
      { text: 'Single Price', tone: 'green' },
    ],
    category: 'Sides',
    trayNote: 'Dressing on side',
    receiptNote: '1 × $7.25',
  },
  {
    id: 'coke',
    name: 'Coke',
    price: 2,
    icon: 'local_cafe',
    iconTone: 'primary',
    description: 'Chilled classic Coca-Cola served with ice and lemon wedge.',
    sizes: [
      { label: 'L', price: 3 },
      { label: 'M', price: 2 },
      { label: 'S', price: 1 },
    ],
    defaultSize: 'M',
    category: 'Drinks',
    trayNote: 'Chilled with lemon',
    receiptNote: 'Size: Medium',
    receiptSizeLabel: { L: 'Large', M: 'Medium', S: 'Small' },
  },
  {
    id: 'sprite',
    name: 'Sprite',
    price: 3,
    icon: 'local_cafe',
    iconTone: 'primary',
    description: 'Crisp, refreshing lemon-lime sparkling soda served cold.',
    sizes: [
      { label: 'L', price: 3 },
      { label: 'M', price: 2 },
      { label: 'S', price: 1 },
    ],
    defaultSize: 'L',
    category: 'Drinks',
    trayNote: ' served cold',
    receiptNote: 'Size: Large',
    receiptSizeLabel: { L: 'Large', M: 'Medium', S: 'Small' },
  },
  {
    id: 'bottled-water',
    name: 'Bottled Water',
    price: 5,
    icon: 'water_drop',
    iconTone: 'secondary',
    description: 'Natural spring mineral water, still or lightly sparkling.',
    tags: [
      { text: '500ml Bottle', tone: 'neutral' },
      { text: 'Fixed Price', tone: 'neutral' },
    ],
    category: 'Drinks',
    trayNote: 'Natural mineral',
    receiptNote: '1 × $5.00',
  },
]

export const pizzaCategories = [
  { label: 'Category 1: Pizzas', icon: 'local_pizza', id: 'category-pizzas' },
  { label: 'Category 2: Sides', icon: 'restaurant', id: 'category-sides' },
  { label: 'Category 3: Drinks', icon: 'local_cafe', id: 'category-drinks' },
]

export const initialCarts = {
  signature: {
    'truffle-burger': { qty: 2 },
    'truffle-fries': { qty: 3 },
    'ginger-brew': { qty: 1 },
  },
  pizza: {
    'pepperoni-pizza': { qty: 2, size: 'Large' },
    'eggplant-pizza': { qty: 1, size: 'Large' },
    fries: { qty: 2, size: 'Large' },
    'greek-salad': { qty: 1 },
    coke: { qty: 2, size: 'M' },
    'bottled-water': { qty: 1 },
  },
}

export const flowConfig = {
  signature: {
    menuPath: '/menu-selections',
    checkoutPath: '/review-pay',
    taxRate: 0.09,
    taxLabel: 'State & Local Dining Tax (9%)',
    checkoutTaxLabel: 'State & Local Tax (9%)',
    serviceFee: 1.5,
    orderReference: '#SV-8924',
    server: 'Elena M.',
    receiptEmail: 'alexander.w@example.com',
    menuTitle: 'Your Current Selection',
    orderSlipTitle: '3 Items in Batch',
    successMessage:
      'Elena M. has received your tickets at Table 14. Estimated preparation time is 14–18 minutes.',
  },
  pizza: {
    menuPath: '/menu-order',
    checkoutPath: '/ready-to-pay',
    taxRate: 0.085,
    taxLabel: 'State & Local Tax (8.5%)',
    checkoutTaxLabel: 'State & Local Tax (8.5%)',
    serviceFee: 0,
    orderReference: '#SV-8924',
    server: 'Elena M.',
    receiptEmail: 'alexander.w@example.com',
    menuTitle: 'Current Order',
    orderSlipTitle: '6 Items in Order',
    successMessage:
      'Elena M. has received your pizza order tickets for Table 14. Estimated preparation time is 14–18 minutes.',
  },
}
