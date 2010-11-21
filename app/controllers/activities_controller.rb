class ActivitiesController < ApplicationController
  before_filter :require_user
  before_filter :find_activity, :only => [:update, :complete]
  respond_to :json
  
  def index
    @activities = Activity.listable.unseen
    @activities.map(&:seen!)
    respond_with @activities
  end
  
  protected  
    def find_activity
      @activity = Activity.listable.find(params[:id])
    end
end
