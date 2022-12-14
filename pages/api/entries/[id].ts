import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = { message: string } | IEntry;

export default function EntryHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'El id no es valido: ' + id });
  }

  switch (req.method) {
    case 'GET':
      return getEntry(req, res);

    case 'PUT':
      return updateEntry(req, res);

    case 'DELETE':
      return deleteEntry(req, res);

    default:
      return res.status(400).json({ message: 'Metodo no existe' });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query;
    await db.connect();

    const entry = await Entry.findById(id);

    if (!entry) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'No hay entrada con ese ID: ' + id });
    }

    await db.disconnect();
    res.status(200).json(entry);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: 'Bad request' });
  }
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: 'No hay entrada con ese ID: ' + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }

  // entryToUpdate.description = description;
  // entryToUpdate.status = status;
  // await entryToUpdate.save();
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query;
    await db.connect();

    const entryToDelete = await Entry.findByIdAndDelete(id);

    if (!entryToDelete) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'No hay entrada con ese ID: ' + id });
    }
    await db.disconnect();

    res.status(200).json(entryToDelete);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: 'Bad request' });
  }
};
