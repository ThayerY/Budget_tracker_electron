import { Item } from '../../models/Item.js';
import { convertTo12HourFormat } from '../../helpers/timeConversion.js';

export const putItem = async (req, res) => {
  try {
    const updatedItemData = {
      ...req.body,
      time: convertTo12HourFormat(req.body.time),
    };
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updatedItemData,
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating item' });
  }
};