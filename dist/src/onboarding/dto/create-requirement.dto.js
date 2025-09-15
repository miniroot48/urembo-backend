"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRequirementDto = void 0;
const class_validator_1 = require("class-validator");
class CreateRequirementDto {
}
exports.CreateRequirementDto = CreateRequirementDto;
__decorate([
    (0, class_validator_1.IsEnum)(['client', 'vendor', 'retailer', 'admin', 'manufacturer']),
    __metadata("design:type", String)
], CreateRequirementDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRequirementDto.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['text', 'textarea', 'select', 'file', 'email', 'phone', 'url', 'rich_text']),
    __metadata("design:type", String)
], CreateRequirementDto.prototype, "fieldType", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRequirementDto.prototype, "isMandatory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRequirementDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRequirementDto.prototype, "placeholder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateRequirementDto.prototype, "selectOptions", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateRequirementDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRequirementDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRequirementDto.prototype, "isPaymentRelated", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateRequirementDto.prototype, "validationRules", void 0);
//# sourceMappingURL=create-requirement.dto.js.map