import mongoose from 'mongoose';
interface userAttrs {
	name: string;
	mobile: string;
	password: string;
}
interface userModel extends mongoose.Model<userDoc> {
	build(attrs: userAttrs): userDoc;
}
interface userDoc extends mongoose.Document {
	name: string;
	mobile: string;
	password: string;
}
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				delete ret.password;
			},
		},
	}
);
// userSchema.pre('save', async function (done) {
// 	if (this.isModified('password')) {
// 		const hashed = await Password.toHash(this.get('password'));
// 		this.set('password', hashed);
// 	}
// 	done();
// });
userSchema.statics.build = (attrs: userAttrs) => {
	return new User(attrs);
};
const User = mongoose.model<userDoc, userModel>('User', userSchema);

export { User };
