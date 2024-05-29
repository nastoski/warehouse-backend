import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        quantity: { type: Number, required: true }
    }]
}, { timestamps: true });

StoreSchema.methods.transferItemFromWarehouse = function(itemId, quantity) {
    const itemIndex = this.items.findIndex(item => item.item.equals(itemId));
    if (itemIndex !== -1) {
        this.items[itemIndex].quantity += quantity;
    } else {
        this.items.push({ item: itemId, quantity });
    }
    return { success: true, message: 'Item added to store successfully' };
};

export default mongoose.model('Store', StoreSchema);
