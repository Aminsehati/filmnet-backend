import { Subscription } from './subscription.schema';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSubscriptionByAdminDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionByAdminDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectModel('subscriptions') private subscriptionModel: Model<Subscription>,
    ) {

    }
    async getSubscriptions() {
        const items = await this.subscriptionModel.find();
        const count = await this.subscriptionModel.find().count();
        return {
            items,
            count
        }
    }
    async getSubscription(id: string) {
        const subscription = await this.subscriptionModel.findOne({ _id: id });
        if (!subscription) {
            throw new NotFoundException('آیتمی یافت نشد')
        }
        return subscription
    }
    async getSubscriptionsByAdmin() {
        const items = await this.subscriptionModel.find({});
        const count = await this.subscriptionModel.find().count();
        return {
            items,
            count
        }
    }

    async getSubscriptionByAdmin(id: string) {
        const subscription = await this.subscriptionModel.findOne({ _id: id });
        if (!subscription) {
            throw new NotFoundException('آیتمی یافت نشد')
        }
        return subscription
    }
    async createSubscriptionByAdmin(body: CreateSubscriptionByAdminDto) {
        const price_after_discount = Math.floor(body.price * (100 - body.discount_percent) / 100);
        console.log(price_after_discount);
        return await this.subscriptionModel.create({
            ...body,
            price_after_discount
        })
    }
    async updateSubscriptionByAdmin(id: string, body: UpdateSubscriptionByAdminDto) {
        const subscription = await this.subscriptionModel.findOne({ _id: id });
        if (!subscription) {
            throw new NotFoundException('آیتمی یافت نشد')
        }
        const price = body?.price !== undefined ? body.price : subscription.price;
        const discount_percent = body?.discount_percent !== undefined ? body.discount_percent : subscription.discount_percent
        const price_after_discount = Math.floor(price * (100 - discount_percent) / 100);
        await this.subscriptionModel.updateOne({ _id: subscription._id }, {
            ...body,
            price_after_discount
        })
    }
}