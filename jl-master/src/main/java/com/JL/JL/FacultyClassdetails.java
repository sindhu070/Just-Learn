package com.JL.JL;

public class FacultyClassdetails {
	private String yearandsection,subname,subcode;
	
	public FacultyClassdetails() {
		
	}
	
    public FacultyClassdetails(String yearandsection,String subname,String subcode) {
    	this.subcode=subcode;
    	this.subname=subname;
    	this.yearandsection=yearandsection;
	}
	
	public String getYearandsection() {
		return yearandsection;
	}

	public void setYearandsection(String yearandsection) {
		this.yearandsection = yearandsection;
	}

	public String getSubname() {
		return subname;
	}

	public void setSubname(String subname) {
		this.subname = subname;
	}

	public String getSubcode() {
		return subcode;
	}

	public void setSubcode(String subcode) {
		this.subcode = subcode;
	}
	
}