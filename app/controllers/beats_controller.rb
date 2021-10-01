class BeatsController < ApplicationController

    def index
        render json: Beat.all.order(id: :desc)
    end
    
    def show
        beat = find_beat
        render json: beat
    end

    def create
        beat = Beat.create!(beat_params)
        render json: beat, status: :created
    end

    def update
        beat = find_beat
        beat.update!(beat_params)
        render json: beat, status: :accepted
    end

    def destroy
        beat = find_beat
        beat.destroy
        head :no_content
    end

    private

    def find_beat
        Beat.find(params[:id])
    end

    def beat_params
        params.permit(:user_id, :genre_id, :name, :tempo, :price, :plays, :is_sold, :date_sold, :audio_url)
    end
end
