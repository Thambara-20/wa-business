import { AppDataSource } from "../config/data-source";
import { Template } from "../entity/template";
import { Button } from "../entity/button";
import { User } from "../entity/user";
import { getManager } from "typeorm";
import { getRepository } from "typeorm";

export class TemplateDTO {
  id: string;
  name: string;
  userId?: string;
  buttons?: Button[] | null;
}

export class TemplateService {
  private templateRepository = AppDataSource.getRepository(Template);
  private buttonRepository = AppDataSource.getRepository(Button);

  async getAllTemplates(): Promise<Template[]> {
    return await this.templateRepository.find({ relations: ["buttons"] });
  }

  async createTemplate(
    name: string,
    email: string,
    transactionalEntityManager: any
  ): Promise<TemplateDTO> {
    //done
    const user = await transactionalEntityManager.findOne(User, {
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const template = new Template();
    template.name = name;
    template.user = user;

    await transactionalEntityManager.save(template);
    await this.addButtonsToTemplate(transactionalEntityManager, template.id);

    return { id: template.id, name: template.name, userId: user.email };
  }

  async getTemplateByUserId(userid: string): Promise<Template | undefined> {
    //done
    return await this.templateRepository.findOne({
      where: { user: { email: userid } },
      relations: ["buttons"],
    });
  }

  async updateTemplate(
    //done
    id: string,
    name: string,
    buttons: { name: string; link: string }[]
  ): Promise<TemplateDTO | undefined> {
    if (!id || !name || !buttons) {
      return undefined;
    }
    return AppDataSource.transaction(async (transactionalEntityManager) => {
      const template = await transactionalEntityManager.findOne(Template, {
        where: { id: id },
      });

      if (!template) {
        return undefined;
      }

      template.name = name;
      const currentButtons = await transactionalEntityManager.find(Button, {
        where: { template: { id: template.id } },
      });

      await transactionalEntityManager.remove(currentButtons);

      for (const buttonData of buttons) {
        const button = new Button();
        button.name = buttonData.name;
        button.link = buttonData.link;
        button.template = template;
        await transactionalEntityManager.save(button);
        console.log(button)
      }

      const updatedTemplate = await transactionalEntityManager.save(template);
      return {
        id: updatedTemplate.id,
        name: updatedTemplate.name,
      };
    });
  }

  async addButtonsToTemplate(
    transactionalEntityManager: any,
    templateId: string,
    buttonsData: { name: string; link: string }[] = [
      { link: "https://www.sample.com", name: "Sample" },
    ]
  ): Promise<Button[]> {
    //done
    const template = await transactionalEntityManager.findOne(Template, {
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
      buttons.push(await transactionalEntityManager.save(button));
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
