import { Request, Response } from "express";
import { TemplateService } from "../services/templateService";

export class TemplateController {
  private templateService = new TemplateService();

  async getAllTemplates(req: Request, res: Response) {
    try {
      const templates = await this.templateService.getAllTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createTemplate(req: Request, res: Response) {
    const { name, userId, buttons } = req.body;
    try {
      const template = await this.templateService.createTemplate(name, userId);
      if (buttons && buttons.length > 0) {
        await this.templateService.addButtonsToTemplate(template.id, buttons);
      }
      res.status(201).json(template);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTemplateById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const template = await this.templateService.getTemplateByUserId(id);
      if (template) {
        res.json(template);
      } else {
        res.status(404).json({ message: "Template not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTemplate(req: Request, res: Response) {
    const { name, id, buttons } = req.body;

    try {
      const template = await this.templateService.updateTemplate(
        id,
        name,
        buttons
      );
      if (template) {
        res.json(template);
      } else {
        res.status(404).json({ message: "Template not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteTemplate(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const result = await this.templateService.deleteTemplate(id);
      if (result) {
        res.json({ message: "Template deleted successfully" });
      } else {
        res.status(404).json({ message: "Template not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}




