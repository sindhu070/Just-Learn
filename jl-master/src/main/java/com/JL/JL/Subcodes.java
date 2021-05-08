package com.JL.JL;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Subcodes")
public class Subcodes {
	private String subcode;
	public String getSubcode() {
		return subcode;
	}
	public void setSubcode(String subcode) {
		this.subcode = subcode;
	}
	public Subcodes() {
		
	}
	public Subcodes(String subcode) {
		this.subcode=subcode;
	}

}
