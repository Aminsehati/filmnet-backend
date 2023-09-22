import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Gender, statusAdmin, statusUser } from 'src/common/types/public.types';

export type AdminDocument = HydratedDocument<Admin>;

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
export class Admin {
    @Prop({ type: String, default: "" })
    first_name: string;

    @Prop({ type: String, default: "" })
    last_name: string;

    @Prop({ type: String, unique: true })
    email: string

    @Prop({ type: String, unique: true })
    phone_number: string

    @Prop({ type: String, default: "" })
    img_url: string

    @Prop({ type: String, unique: true })
    username: string

    @Prop({ type: String })
    password: string

    @Prop({ type: Number, enum: statusAdmin, default: statusAdmin.CONFIRMED })
    status: statusAdmin;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);