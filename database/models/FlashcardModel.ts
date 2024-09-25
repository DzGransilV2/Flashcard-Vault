// model/Post.js
import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class FlashcardModel extends Model {
  static table = 'cards'
  
  @text('question') question?: string;
  @text('answer') answer?: string;
  @text('keywords') keywords?: string;
}