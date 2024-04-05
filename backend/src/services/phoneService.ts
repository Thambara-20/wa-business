import { Phone } from "../entity/phone";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/user";
import { Button } from "../entity/button";

export class PhoneService {
  private phoneRepository = AppDataSource.getRepository(Phone);
  private userRepository = AppDataSource.getRepository(User);
  private buttonsRepository = AppDataSource.getRepository(Button);

  async updatePhoneNumbersByUserId(userId: any, phoneNumbers: string[]) {
    if (!userId) {
      return undefined;
    }
    const user = await this.userRepository.findOne({
      where: { email: userId, verified: true },
      relations: ["phone_numbers"],
    });

    if (!user) {
      return undefined;
    }
    await this.phoneRepository.remove(user.phone_numbers);
    for (let i = 0; i < phoneNumbers.length; i++) {
      if (phoneNumbers[i].length != 10) {
        return undefined;
      }
      const phone = new Phone();
      phone.phone_number = phoneNumbers[i];
      phone.user = user;
      await this.phoneRepository.save(phone);
    }

    return phoneNumbers;
  }

  async getPhoneNumbersByUserId(email: string) {
    if (!email) {
      return undefined;
    }
    const user = await this.userRepository.findOne({
      where: { email, verified: true },
      relations: ["phone_numbers"],
    });

    if (!user) {
      return undefined;
    }
    const phoneNumbers = user.phone_numbers.map((phone) => phone.phone_number);
    return { allowedMobileNumbers: phoneNumbers };
  }

  async getAllByMobileId(phoneId: string, from: string) {
    if (!phoneId || !from) {
      return undefined;
    }
    const user = await this.userRepository.findOne({
      where: { phoneId, verified: true },
      relations: ["templates", "phone_numbers"],
    });
    console.log(user, "user data");
    const allowed = user.phone_numbers;

    if (!user || !allowed.some((phone) => phone.phone_number === from)) {
      return undefined;
    }
    const buttons = await this.buttonsRepository.find({
      where: { template: user.templates[0] },
    });
    
    console.log({
      template: user.templates[0],
      buttons: buttons,
      user: {
        email: user.email,
        whatsappToken: user.whatsappToken,
        phoneId: user.phoneId,
        verifyToken: user.verifyToken,
      },
    });

    return {
      template: user.templates[0],
      buttons,
      user: {
        email: user.email,
        whatsappToken: user.whatsappToken,
        phoneId: user.phoneId,
        verifyToken: user.verifyToken,
      },
    };
  }
}
