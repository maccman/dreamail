class ContactsController < ApplicationController
  before_filter :require_user
  before_filter :find_contact, :only => [:update, :destroy]
  respond_to :json
  
  def index
    @contacts = Contact.listable
    respond_with @contacts
  end
  
  def create
    @contact = Contact.new(params[:contact])
    @contact.user = current_user
    @contact.save!
    head :ok
  end
  
  def update
    @contact.update_attributes!(params[:contact])
    head :ok
  end
  
  def delete
    @contact.destroy
    head :no_content
  end
  
  # GET /contacts/:id/vcard
  # Export contact as VCard
  def vcard
  end

  # GET /contacts/info?email=:email
  # Fetch data for an email address, to 
  # autocomplete a new contact's form fields.
  def info
  end
  
  protected
  
    def find_contact
      @contact = Contact.listable.find(params[:id])
    end
end
