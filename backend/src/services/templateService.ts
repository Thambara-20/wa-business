import { AppDataSource } from "../config/data-source";
import { Template } from "../entity/template";
import { getRepository } from "typeorm";
import { Button } from "../entity/button";

export class TemplateService {
  private templateRepository = AppDataSource.getRepository(Template);
  private buttonRepository = AppDataSource.getRepository(Button);

  async getAllTemplates(): Promise<Template[]> {
    return await this.templateRepository.find({ relations: ["buttons"] });
  }

  async createTemplate(name: string, userId: string): Promise<Template> {
    const template = new Template();
    template.name = name;
    template.userId = userId;
    return await this.templateRepository.save(template);
  }

  async getTemplateByUserId(userid: string): Promise<Template | undefined> {
    return await this.templateRepository.findOne({
      where: { userId: userid },
      relations: ["buttons"],
    });
  }

  async updateTemplate(
    id: string,
    name: string,
    buttons: { name: string; link: string }[]
  ): Promise<Template | undefined> {
    const template = await this.templateRepository.findOne({ where: { id } });
    if (!template) {
      return undefined;
    }
    template.name = name;
    template.buttons = await this.addButtonsToTemplate(id, buttons);
    return await this.templateRepository.save(template);
  }

  async deleteTemplate(id: number): Promise<boolean> {
    const result = await this.templateRepository.delete(id);
    return result.affected !== 0;
  }

  async addButtonsToTemplate(
    templateId: string,
    buttonsData: { name: string; link: string }[]
  ): Promise<Button[]> {
    const template = await this.templateRepository.findOne({
      where: { id: templateId },
    });

    if (!template) {
      throw new Error("Template not found");
    }

    const buttons: Button[] = [];

    for (const buttonData of buttonsData) {
      const button = new Button();
      button.name = buttonData.name;
      button.link = buttonData.link;
      button.template = template;
      buttons.push(await this.buttonRepository.save(button));
    }

    return buttons;
  }

  async updateButtons(
    buttonsData: { id: string; name: string; link: string }[]
  ): Promise<Button[]> {
    
    const buttons: Button[] = [];
    for (const buttonData of buttonsData) {
      const button = await this.buttonRepository.findOne({
        where: { id: buttonData.id },
      });
      if (!button) {
        throw new Error("Button not found");
      }
      button.name = buttonData.name;
      button.link = buttonData.link;
      buttons.push(await this.buttonRepository.save(button));
    }
    return buttons;
  }
}
