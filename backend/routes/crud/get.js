
import { convertTo12HourFormat } from '../../helpers/timeConversion.js';
import { Item } from '../../models/Item.js';


// GET /items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    const formattedItems = items.map(item => ({
      ...item.toObject(),
      time: convertTo12HourFormat(item.time),
    }));
    res.json(formattedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching items' });
  }
};