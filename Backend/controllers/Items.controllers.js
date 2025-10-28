const Item = require('../models/Items.model');


const sampleItems = [
  {
    name: "Classic Chicken Burger",
    description: "Juicy grilled chicken patty layered with lettuce, tomato, and creamy mayo in a soft bun.",
    category: "burger",
    image: "https://example.com/images/classic-chicken-burger.jpg",
    preparationTime: 15,
    price: 199
  },
  {
    name: "Cheese Burst Pizza",
    description: "Loaded with mozzarella cheese, crispy crust, and a gooey cheese-filled center.",
    category: "pizza",
    image: "https://example.com/images/cheese-burst-pizza.jpg",
    preparationTime: 20,
    price: 299
  },
  {
    name: "Peri Peri Fries",
    description: "Crispy french fries tossed in spicy peri peri seasoning for a flavorful kick.",
    category: "french fries",
    image: "https://example.com/images/peri-peri-fries.jpg",
    preparationTime: 10,
    price: 129
  },
  {
    name: "Potato Wedges",
    description: "Golden-brown potato wedges seasoned with herbs and served with garlic mayo.",
    category: "wedges",
    image: "https://example.com/images/potato-wedges.jpg",
    preparationTime: 12,
    price: 139
  },
  {
    name: "Double Beef Burger",
    description: "Two grilled beef patties, melted cheddar cheese, onions, and special sauce in a sesame bun.",
    category: "burger",
    image: "https://example.com/images/double-beef-burger.jpg",
    preparationTime: 18,
    price: 249
  },
  {
    name: "Veggie Supreme Pizza",
    description: "Topped with bell peppers, mushrooms, olives, and mozzarella on a crispy crust.",
    category: "pizza",
    image: "https://example.com/images/veggie-supreme-pizza.jpg",
    preparationTime: 22,
    price: 279
  },
  {
    name: "Cheesy Fries",
    description: "Crispy fries topped with melted cheddar cheese and oregano flakes.",
    category: "french fries",
    image: "https://example.com/images/cheesy-fries.jpg",
    preparationTime: 9,
    price: 149
  },
  {
    name: "Spicy Wedges",
    description: "Crispy potato wedges seasoned with spicy paprika and served hot.",
    category: "wedges",
    image: "https://example.com/images/spicy-wedges.jpg",
    preparationTime: 11,
    price: 129
  },
  {
    name: "Classic Chicken Burger",
    description: "Juicy grilled chicken patty layered with lettuce, tomato, and creamy mayo in a soft bun.",
    category: "burger",
    image: "https://example.com/images/classic-chicken-burger.jpg",
    preparationTime: 15,
    price: 199
  },
  {
    name: "Cheese Burst Pizza",
    description: "Loaded with mozzarella cheese, crispy crust, and a gooey cheese-filled center.",
    category: "pizza",
    image: "https://example.com/images/cheese-burst-pizza.jpg",
    preparationTime: 20,
    price: 299
  },
  {
    name: "Peri Peri Fries",
    description: "Crispy french fries tossed in spicy peri peri seasoning for a flavorful kick.",
    category: "french fries",
    image: "https://example.com/images/peri-peri-fries.jpg",
    preparationTime: 10,
    price: 129
  },
  {
    name: "Potato Wedges",
    description: "Golden-brown potato wedges seasoned with herbs and served with garlic mayo.",
    category: "wedges",
    image: "https://example.com/images/potato-wedges.jpg",
    preparationTime: 12,
    price: 139
  },
  {
    name: "Double Beef Burger",
    description: "Two grilled beef patties, melted cheddar cheese, onions, and special sauce in a sesame bun.",
    category: "burger",
    image: "https://example.com/images/double-beef-burger.jpg",
    preparationTime: 18,
    price: 249
  },
  {
    name: "Veggie Supreme Pizza",
    description: "Topped with bell peppers, mushrooms, olives, and mozzarella on a crispy crust.",
    category: "pizza",
    image: "https://example.com/images/veggie-supreme-pizza.jpg",
    preparationTime: 22,
    price: 279
  },
  {
    name: "Cheesy Fries",
    description: "Crispy fries topped with melted cheddar cheese and oregano flakes.",
    category: "french fries",
    image: "https://example.com/images/cheesy-fries.jpg",
    preparationTime: 9,
    price: 149
  },
  {
    name: "Spicy Wedges",
    description: "Crispy potato wedges seasoned with spicy paprika and served hot.",
    category: "wedges",
    image: "https://example.com/images/spicy-wedges.jpg",
    preparationTime: 11,
    price: 129
  }
];

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
