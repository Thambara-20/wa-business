import { AppDataSource } from "../config/data-source";
import { Button } from "../entity/button";

export class ButtonService {
  private buttonRepository =AppDataSource.getRepository(Button);

  async getAllButtons(): Promise<Button[]> {
    return await this.buttonRepository.find();
  }

//   async createButton(name: string, link: string, templateId: string): Promise<Button> {
//     const button = new Button();
//     button.name = name; 
//     button.link = link;
//     return await this.buttonRepository.save(button);
//   }

  async getButtonById(id: string): Promise<Button | undefined> {
    return await this.buttonRepository.findOne({where: {id}});
  }

  async updateButton(id: string, name: string, link: string): Promise<Button | undefined> {
    const button = await this.buttonRepository.findOne({where: {id}});
    if (!button) {
      return undefined;
    }
    button.name = name;
    button.link = link;
    return await this.buttonRepository.save(button);
  }

  async deleteButton(id: string): Promise<boolean> {
    const result = await this.buttonRepository.delete(id);
    return result.affected !== 0;
  }
}
