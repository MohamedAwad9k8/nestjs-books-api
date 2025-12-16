import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../enums/roles.enum";


@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
    @Prop({unique: [true, 'email already exists!']})
    email: string;

    @Prop()
    name: string;

    @Prop({select: false})
    password: string;

    @Prop({
        type: [{type: String, enum: Role}],
        default: [Role.USER],
    })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);