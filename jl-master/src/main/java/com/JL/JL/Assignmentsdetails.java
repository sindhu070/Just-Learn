package com.JL.JL;

import java.time.LocalDate;
import java.util.List;

public class Assignmentsdetails {
	private String srollnumber,assique,assiid;
	private int smarks,assimarks;
	private List<String> assians;
	public String getSrollnumber() {
		return srollnumber;
	}
	public void setSrollnumber(String srollnumber) {
		this.srollnumber = srollnumber;
	}
	private LocalDate deadline;
	public LocalDate getDeadline() {
		return deadline;
	}

	public void setDeadline(LocalDate deadline) {
		this.deadline = deadline;
	}
	public String getAssique() {
		return assique;
	}
	public void setAssique(String assique) {
		this.assique = assique;
	}
	public String getAssiid() {
		return assiid;
	}
	public void setAssiid(String assiid) {
		this.assiid = assiid;
	}
	public int getSmarks() {
		return smarks;
	}
	public void setSmarks(int smarks) {
		this.smarks = smarks;
	}
	public int getAssimarks() {
		return assimarks;
	}
	public void setAssimarks(int assimarks) {
		this.assimarks = assimarks;
	}
	public List<String> getAssians() {
		return assians;
	}
	public void setAssians(List<String> assians) {
		this.assians = assians;
	}
	

}
