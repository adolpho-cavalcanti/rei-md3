import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { email } = createPlayerDto;
        // const playerFind = this.players.find(player => player.email === email);
        const playerFind = await this.playerModel.findOne({email}).exec();
        
        if(playerFind) {
            this.updatePlayer(createPlayerDto);
        } else {
            this.createPlayer(createPlayerDto);
        }
    }

    async listPlayers(): Promise<Player[]> {
        // return await this.players;
        return await this.playerModel.find().exec();
    }

    async listPlayerForEmail(email: string): Promise<Player> {
        const player = await this.playerModel.findOne({email}).exec();
        if(!player) {
            throw new NotFoundException(`Jogador com ${email} não encontrado!`);
        }
        return await player;
    }

    async deletePlayer(email: string): Promise<any> {
        // const playerFind = this.players.find(player => player.email === email);
        // this.players = this.players.filter(player => player.email != playerFind.email);
        return await this.playerModel.deleteOne({email}).exec();
    }

    private async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const playerCreated = new this.playerModel(createPlayerDto);
        return await playerCreated.save();

        // const {name, email, phoneNumber} = createPlayerDto;
        // const player: Player = {
        //     _id: uuidv4(),
        //     name,
        //     email,
        //     phoneNumber,
        //     ranking: 'A',
        //     positionRanking: 3,
        //     urlPlayerPerfil: 'https://www.google.com/foto123.jpg'
        // };
        // this.logger.log(`Cria jogador ${JSON.stringify(player)}`);
        // this.players.push(player);
    }

    private async updatePlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
        return await this.playerModel.findOneAndUpdate(
            { email:  createPlayerDto.email}, 
            { $set: createPlayerDto }).exec(); 
        // const { name } = createPlayerDto;
        // playerFind.name = name;

    }
}
