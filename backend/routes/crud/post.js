import { Item } from '../../models/Item.js';
import { convertTo12HourFormat } from '../../helpers/timeConversion.js';

export const postItem = async (req, res) => {
  try {
    const itemToSave = {
      ...req.body,
      time: convertTo12HourFormat(req.body.time),
    };
    const newItem = new Item(itemToSave);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding item' });
  }
};