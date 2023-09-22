import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Gender, statusUser } from 'src/common/types/public.types';

export type UserDocument = HydratedDocument<User>;

@Schema({
    versionKey: false,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        },
    },
    timestamps: true,
})
export class User {
    @Prop({ type: String, default: "" })
    name: string;

    @Prop({ type: Date, default: new Date() })
    birth_day: Date;

    @Prop({ type: String })
    email: string

    @Prop({ type: String, unique: true })
    phone_number: string

    @Prop({ type: String, enum: Gender, default: Gender.NONE })
    gender: Gender;

    @Prop({ type: String, default: "" })
    img_url: string

    @Prop({ type: String })
    password: string

    @Prop({ type: Number, default: 0 })
    balance: number

    @Prop({ type: String, default: "" })
    flag: string

    @Prop({ type: Number, default: 0 })
    subscription_remaining_in_day: number

    @Prop({ type: Number, enum: statusUser, default: statusUser.CONFIRMED })
    status: statusUser;
}

export const UserSchema = SchemaFactory.createForClass(User);