import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
    constructor(
        private readonly playersService: PlayersService,
    ){}
    @Post()
    async createUpdatePlayer(
        @Body() createPlayerDto: CreatePlayerDto,
    ) {
        return await this.playersService.createUpdatePlayer(createPlayerDto);
    }
    @Get()
    async listPlayers(
        @Query('email') email: string
    ): Promise<Player[] | Player> {
        if(email) {
            return await this.playersService.listPlayerForEmail(email);
        } else {
            return await this.playersService.listPlayers();
        }
    }
    @Delete()
    async deletePlayer(
        @Query('email') email: string
    ): Promise<void> {
        return await this.playersService.deletePlayer(email);
    }
}
