import { Phone } from "../entity/phone";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/user";
import { And } from "typeorm";

export class PhoneService {
  private phoneRepository = AppDataSource.getRepository(Phone);
  private userRepository = AppDataSource.getRepository(User);

  async updatePhoneNumbersByUserId(userId: any, phoneNumbers: string[]) {
    const user = await this.userRepository.findOne({
      where: { email: userId },
      relations: ["phone_numbers"],
    });

    if (!user) {
      return undefined;
    }
    console.log(user, "user data");
    await this.phoneRepository.remove(user.phone_numbers);
    for (let i = 0; i < phoneNumbers.length; i++) {
      const phone = new Phone();
      phone.phone_number = phoneNumbers[i];
      phone.user = user;
      await this.phoneRepository.save(phone);
    }

    return phoneNumbers;
  }

  async getPhoneNumbersByUserId(email: string, tel: string) {
    const user = await this.userRepository.findOne({
      where: { email, tel },
      relations: ["phone_numbers"],
    });

    if (!user) {
      return undefined;
    }
    console.log(user, "user data");
    return user.phone_numbers;
  }
}
