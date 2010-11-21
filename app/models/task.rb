class Task < ActiveRecord::Base
  belongs_to :user
  
  validates_presence_of :user_id, :name
  
  attr_accessible :name, :notes, :completed
  
  serialize_options do 
    only :name, :notes, :completed
  end
  
  scope :listable, Proc.new {
    where(:user_id => current_user.id)
  }
end
