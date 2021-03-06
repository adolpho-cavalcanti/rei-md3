import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:JmyQfzcqwHVyCG5s@cluster0.rpbqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,useFindAndModify: false },
    ),
    PlayersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
