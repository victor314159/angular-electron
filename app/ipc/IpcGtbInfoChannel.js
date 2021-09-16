"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemInfoChannel = void 0;
var SystemInfoChannel = /** @class */ (function () {
    function SystemInfoChannel() {
    }
    SystemInfoChannel.prototype.getName = function () {
        return 'system-info';
    };
    SystemInfoChannel.prototype.handle = function (event, request) {
        if (!request.responseChannel) {
            request.responseChannel = this.getName() + "_response";
        }
        event.sender.send(request.responseChannel, { kernel: "abcd" });
    };
    return SystemInfoChannel;
}());
exports.SystemInfoChannel = SystemInfoChannel;
//# sourceMappingURL=IpcGtbInfoChannel.js.map