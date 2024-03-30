import { Request, Response } from "express";
import { TemplateService } from "../services/templateService";
import { sendMessage } from "../services/emailService";
import { getSocketInstance } from "../services/socketService";

export class TemplateController {
  private templateService = new TemplateService();
  private io = getSocketInstance();

  async getAllTemplates(req: Request, res: Response) {
    //done
    try {
      const templates = await this.templateService.getAllTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTemplateByUserId(req: Request, res: Response) {
    //done
    const id = req.params.id;
    try {
      const template = await this.templateService.getTemplateByUserId(id);
      if (template) {
        console.log("template found");
        res.json(template);
      } else {
        res.status(404).json({ message: "Template not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTemplate(req: Request, res: Response) {
    //done
    const { name, id, buttons } = req.body;
    const socketId = req.params.socketId;


    try {
      console.log(req.body);
      const template = await this.templateService.updateTemplate(
        id,
        name,
        buttons
      );
      if (template) {
        console.log("template updated");
        sendMessage(this.io, socketId, "template_updated_successfully", id);
        res.json(template);
      } else {

        res.status(404).json({ message: "Template not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
