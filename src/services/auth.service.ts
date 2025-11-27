import { User } from "../models/user.model";
import { IUserRepository } from "../repositories/interfaces/user.repository.interface";
import { UserRepositoryFirestore } from "../repositories/user.repository.firestore";
import admin from 'firebase-admin';

export class AuthService {

    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepositoryFirestore();
    }

    async login(token: string) {
        token = token.replace("Bearer ", "").trim();
        const decoded = await admin.auth().verifyIdToken(token);
        const uid = decoded.uid;
        if (!(await this.userRepository.exist(uid))) {
            let user: User = {
                email: decoded.email!,
                id: uid,
                name: decoded.name
            };

            await this.userRepository.save(user);
        }
    }
}