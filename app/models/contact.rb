class Contact < ActiveRecord::Base
  belongs_to :user
  
  validates_presence_of :email, :user_id
  
  attr_accessible :first_name,
                  :last_name,
                  :email,
                  :mobile,
                  :work,
                  :address,
                  :notes
  
  serialize_options do
    except :user_id
    methods :avatar_src, :linkedin_url, 
            :facebook_url, :twitter_url
    methods :jabber, :skype
  end
  
  scope :listable, Proc.new {
    where(:user_id => current_user.id)
  }
  
  attr_writer :loaded
      
  def bio
  end
  
  def avatar_src
  end
  
  def linkedin_url
  end
  
  def facebook_url
  end
  
  def twitter_url
  end
  
  def jabber
  end
  
  def skype
  end
end
