/// <reference types="web-bluetooth" />

import { ChangeEvent, useEffect, useRef, useState } from "react";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function stringToUint8Array(str: string) {
    return textEncoder.encode(str);
}

function uint8ArrayToString(arr: Uint8Array | DataView) {
    return textDecoder.decode(arr);
}

export default function Bluetooth() {

    const [networks, setNetworks] = useState<string[]>();
    const [ssid, setSsid] = useState();
    const [password, setPassword] = useState();
    const [bluetoothDevice, setBluetoothDevice] = useState<BluetoothDevice | undefined>(undefined);

    // Characteristics
    const [ssidCharacteristic, setSsidCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | undefined>();
    const [passwordCharacteristic, setPasswordCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | undefined>();
    const [deviceIdCharacteristic, setDeviceIdCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | undefined>();
    const [networksCharacteristic, setNetworksCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | undefined>();
    const [wifiConnectionStatusCharacteristic, setWifiConnectionStatusCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | undefined>();

    useEffect(() => {
        async function requestDeviceAndAvailableWifiNetworks() {
            await connectToDevice();
            await requestAvailableNetworks();
        }
        if (bluetoothDevice) requestDeviceAndAvailableWifiNetworks();
    }, [bluetoothDevice])

    const requestDevice = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: ["6e400001-b5a0-f393-e0a9-e50e24dcca9e"]
            });
            setBluetoothDevice(device);
        } catch (error) {
            console.error(error);
        }
    }

    const connectToDevice = async () => {
        try {
            const server = await bluetoothDevice?.gatt?.connect();
            const service = await server?.getPrimaryService("6e400001-b5a0-f393-e0a9-e50e24dcca9e");

            setNetworksCharacteristic(await service?.getCharacteristic("6e400001-b5a3-f393-e0a9-e50e24dcca9e"))

            // const WIFI_SSID_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a1-f393-e0a9-e50e24dcca9e"); // Write
            // const WIFI_PASS_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a2-f393-e0a9-e50e24dcca9e"); // Write
            // const DEVICE_UID = await service.getCharacteristic(); // Read
            // const WIFI_NETWORKS_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a3-f393-e0a9-e50e24dcca9e"); // Read
            // const WIFI_CONNECTION_STATUS_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a4-f393-e0a9-e50e24dcca9e"); // Read

        } catch (error) {
            console.error(error);
        }
    }

    const requestAvailableNetworks = async () => {
        try {
            networksCharacteristic?.addEventListener("characteristicvaluechanged", (event: Event) => {
                const wifiNetworks = uint8ArrayToString((event.target as BluetoothRemoteGATTCharacteristic).value!);
                setNetworks(wifiNetworks.split(" "));
            });

            await networksCharacteristic?.startNotifications();
        } catch (error) {
            console.error(error);
        }
    }

    // Send wifi credentials from user input to device
    const sendWifiCredentials = async () => {

    }

    const handleConnectToBluetoothDevice = async () => {
        // try {

        //     const device = await navigator.bluetooth.requestDevice({
        //         acceptAllDevices: true,
        //         optionalServices: ["6e400001-b5a0-f393-e0a9-e50e24dcca9e"]
        //     });

        //     setBluetoothDevice(device);

        //     const server = await device.gatt?.connect();

        //     const service = await server?.getPrimaryService("6e400001-b5a0-f393-e0a9-e50e24dcca9e");

        //     if (!service) throw new Error("Failed to connect to raspberry pi.");
        //     // Define Characteristics
        //     // const WIFI_SSID_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a1-f393-e0a9-e50e24dcca9e"); // Write
        //     // const WIFI_PASS_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a2-f393-e0a9-e50e24dcca9e"); // Write
        //     // const DEVICE_UID = await service.getCharacteristic(); // Read
        //     const WIFI_NETWORKS_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a3-f393-e0a9-e50e24dcca9e"); // Read
        //     // const WIFI_CONNECTION_STATUS_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a4-f393-e0a9-e50e24dcca9e"); // Read

        //     let wifiNetworks;

        //     // Gekt wifi networs that are available to bluetooth device
        //     WIFI_NETWORKS_CHARACTERISTIC.addEventListener("characteristicvaluechanged", (event: Event) => {
        //         const value = (event.target as BluetoothRemoteGATTCharacteristic).value!;
        //         wifiNetworks = uint8ArrayToString(value);
        //         console.log(`Received data: ${wifiNetworks}`);
        //         setAvailableWifiNetworks(wifiNetworks.split(" "));
        //     });

        //     await WIFI_NETWORKS_CHARACTERISTIC.startNotifications();



        // } catch (e) {

        // }
    }

    const handleAddDevice = async () => {

        

        // navigator.bluetooth.requestDevice({
        //     acceptAllDevices: true,

        //     optionalServices: ["6e400001-b5a0-f393-e0a9-e50e24dcca9e"]
        // })
        // .then(device => {
        //     if (!device || !device.gatt) throw "Could not connect to device.";
        //     return device.gatt.connect();
        // })
        // .then(async device => {
        //     console.log(device)
        //     const service = await device.getPrimaryService("6e400001-b5a0-f393-e0a9-e50e24dcca9e")
        //     // const readChar = await service.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e")

        //     const WIFI_SSID_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a1-f393-e0a9-e50e24dcca9e"); // Write
        //     const WIFI_PASS_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a2-f393-e0a9-e50e24dcca9e"); // Write
        //     // const DEVICE_UID = await service.getCharacteristic(); // Read
        //     const WIFI_NETWORKS_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a3-f393-e0a9-e50e24dcca9e"); // Read
        //     const WIFI_CONNECTION_STATUS_CHARACTERISTIC = await service.getCharacteristic("6e400001-b5a4-f393-e0a9-e50e24dcca9e"); // Read

        //     let wifiNetworks;

        //     await WIFI_NETWORKS_CHARACTERISTIC.startNotifications();

        //     // Get wifi networks that are available to bluetooth device
        //     WIFI_NETWORKS_CHARACTERISTIC.addEventListener("characteristicvaluechanged", (event: Event) => {
        //         const value = (event.target as BluetoothRemoteGATTCharacteristic).value!;
        //         wifiNetworks = uint8ArrayToString(value);
        //         console.log(`Received data: ${wifiNetworks}`);
        //         setAvailableWifiNetworks(wifiNetworks.split(" "));
        //     });

        //     // Display wifi networks for user to select and then ask for password input

        //     // Send wifi name, password and user id to device

        //     // Wait until device connects to wifi and sends request to connect user document to the device
        // })
        // .catch((error: Error) => {
        //     console.log(error.name)
        //     console.log('Argh! ' + error);
        // });
    }

    return (
        <>
            <h1>Bluetooth</h1>

            <section id="devices">
                <h2>Devices</h2>
                <div id="devices-grid">
                    <button className="btn btn-info" onClick={requestDevice}>Add device</button>
                </div>
            </section>


        </>
    )
}
