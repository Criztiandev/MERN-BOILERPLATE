// base.repository.ts
import { Model, Document, FilterQuery, UpdateQuery, ObjectId } from "mongoose";

class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T | null> {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.error("Error in create method:", error);
      return null;
    }
  }

  async findById(id: string | ObjectId, select?: string): Promise<T | null> {
    try {
      return await this.model
        .findById(id)
        .lean()
        .select(select || "");
    } catch (error) {
      console.error("Error in findById method:", error);
      return null;
    }
  }

  async findOne(filter: FilterQuery<T>, select?: string): Promise<T | null> {
    try {
      return await this.model
        .findOne(filter)
        .lean()
        .select(select || "");
    } catch (error) {
      console.error("Error in findOne method:", error);
      return null;
    }
  }

  async find(filter: FilterQuery<T>, select?: string): Promise<T[] | null> {
    try {
      return await this.model
        .find(filter)
        .lean()
        .select(select || "");
    } catch (error) {
      console.error("Error in find method:", error);
      return null;
    }
  }

  async update(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    select?: string
  ): Promise<T | null> {
    try {
      return await this.model
        .findOneAndUpdate(filter, update, { new: true })
        .lean()
        .select(select || "");
    } catch (error) {
      console.error("Error in update method:", error);
      return null;
    }
  }

  async delete(filter: FilterQuery<T>): Promise<boolean> {
    try {
      const result = await this.model.deleteOne(filter).lean().select("_id");
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error in delete method:", error);
      return false;
    }
  }
}

export default BaseRepository;
