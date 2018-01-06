# pos-state-manager

PoS (Point of Sale) State Manager is a simple application to read a keep-alive state of IoT dispositives, using:
- mqtt

## Installation

Install via git clone:

```bash
git clone https://github.com/denissys/pos-emulator
cd pos-emulator
npm install
```

## Run

```bash
npm start
```

## Configuration

All confs are on directory: ./config/config.yml
- Let's see the main confs:

```yaml
default:
  mqtt:
    protocol: MQTT or TCP
    addrees: Use localhost or server address
    port: Port Number, example 1883 to default installation
    topic: Name of topic to publish messages
    qos:
      level: 0 = guarantees a best effort delivery
             1 = guaranteed that a message will be delivered
             2 = guarantees that each message is received only once by the counterpart
      retain: true = retained messages received and queued messages and if the total exceeds 
                     autosave_interval then the in-memory database will be saved to disk
              false = will save the in-memory database to disk by treating autosave_interval 
                      as a time in seconds
```
