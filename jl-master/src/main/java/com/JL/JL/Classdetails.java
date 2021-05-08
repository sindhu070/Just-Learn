package com.JL.JL;

public class Classdetails {
	private String subcode,subname,name;
	
	public Classdetails() {
		
	}
	
	public Classdetails(String subcode, String subname,String name) {
		this.name=name;
		this.subcode=subcode;
		this.subname=subname;
		
	}

	public String getSubcode() {
		return subcode;
	}

	public void setSubcode(String subcode) {
		this.subcode = subcode;
	}

	public String getSubname() {
		return subname;
	}

	public void setSubname(String subname) {
		this.subname = subname;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	

}
