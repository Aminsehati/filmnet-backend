import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Subscription {
    @Prop({ type: String, default: "" })
    title: string;

    @Prop({ type: String, default: "" })
    description: string;

    @Prop({ type: String, default: "" })
    icon_url: string

    @Prop({ type: Number, default: 0 })
    discount_percent: number


    @Prop({ type: Number, default: 0 })
    price: number

    @Prop({ type: Number, default: 0 })
    price_after_discount: number


    @Prop({ type: Number, default: 0 })
    timestamp: number


}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);