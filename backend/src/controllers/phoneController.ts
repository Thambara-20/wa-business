import { Request, Response } from "express";
import { PhoneService } from "../services/phoneService";

export class PhoneController {
  private phoneService = new PhoneService();

  async updatePhoneNumbers(req: Request, res: Response) {
    const { userId, phoneNumbers } = req.body;
    console.log(req.body);
    try {
      if (!userId || !phoneNumbers) {
        res.status(400).json({ message: "Invalid data" });
        return;
      }
      const User = await this.phoneService.updatePhoneNumbersByUserId(
        userId,
        phoneNumbers
      );
      if (User) {
        console.log(User);
        res.json(User);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getPhoneNumbersByUserId(req: Request, res: Response) {
    const { userId, tel } = req.body;
    try {
      const phoneNumbers =
        await this.phoneService.getPhoneNumbersByUserId(userId, tel);
      if (phoneNumbers) {
        res.json(phoneNumbers);
      } else {
        res.status(404).json({ message: "Phone numbers not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
