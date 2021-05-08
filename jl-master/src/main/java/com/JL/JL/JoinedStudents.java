package com.JL.JL;

public class JoinedStudents {
	private String name,rollnumber,emailid;
	
	public JoinedStudents() {
		
	}
	
	public JoinedStudents(String name,String rollnumber,String emailid) {
		this.name=name;
		this.emailid=emailid;
		this.rollnumber=rollnumber;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRollnumber() {
		return rollnumber;
	}

	public void setRollnumber(String rollnumber) {
		this.rollnumber = rollnumber;
	}

	public String getEmailid() {
		return emailid;
	}

	public void setEmailid(String emailid) {
		this.emailid = emailid;
	}
	

}