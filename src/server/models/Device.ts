import mongoose, { Schema, Types } from 'mongoose';

interface IDevice extends Document {
    device_id: string;
}

const DeviceSchema = new Schema<IDevice>({
    device_id: {
        type: String
    }
})

const Device = mongoose.models.Device || mongoose.model('Device', DeviceSchema);

export default Device;