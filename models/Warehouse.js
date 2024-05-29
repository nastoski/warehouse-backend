import mongoose from 'mongoose';

const WarehouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    items: [{
        item: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Item' },
        quantity: { type: Number, required: true }
    }]
}, { timestamps: true });

WarehouseSchema.methods.transferItemToStore = function(itemId, quantity) {
    const itemIndex = this.items.findIndex(item => item.item.equals(itemId));
    if (itemIndex !== -1) {
        if (this.items[itemIndex].quantity >= quantity) {
            this.items[itemIndex].quantity -= quantity;
            if (this.items[itemIndex].quantity <= 0) {
                this.items.splice(itemIndex, 1);
            }
            return { success: true, message: 'Item transferred successfully' };
        } else {
            return { success: false, message: 'Insufficient quantity in warehouse' };
        }
    }
    return { success: false, message: 'Item not found in warehouse' };
};

export default mongoose.model('Warehouse', WarehouseSchema);
