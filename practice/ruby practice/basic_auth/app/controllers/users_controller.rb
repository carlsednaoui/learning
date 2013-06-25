class UsersController < ApplicationController
  def new
  	@user = User.new
  end

  def create
  	@user = User.new(params[:user])
  	if @user.save
  		redirect_to root_url, :notice => "SIGNed uuuuupppp"
  	else
  		render "new"
  	end
  end
end
