class TasksController < ApplicationController
  before_filter :require_user
  before_filter :find_task, :only => [:update, :complete]
  respond_to :json
  
  def index
    @tasks = Task.listable
    respond_with @tasks
  end
  
  def create
    @task = Task.new(params[:task])
    @task.user = current_user
    @task.save!
    head :ok
  end
  
  def update
    @task.update_attributes!(params[:task])
    head :ok
  end
  
  protected  
    def find_task
      @task = Task.listable.find(params[:id])
    end
end
