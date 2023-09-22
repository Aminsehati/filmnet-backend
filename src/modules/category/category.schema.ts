import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Category {
    @Prop({ type: String, unique: true })
    title: string;

    @Prop({ type: String, unique: true })
    slug: string

    @Prop({ type: String, default: "" })
    img_url: string
}

export const CategorySchema = SchemaFactory.createForClass(Category);