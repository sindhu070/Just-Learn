package com.JL.JL;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.Random;
import java.util.UUID;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
// import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
// import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeMultipart;


//import javax.websocket.Session;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.services.storage.Storage;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.StorageOptions;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;


@SuppressWarnings("unused")
@Service
public class JlServiceImpl implements JlService {
	@Autowired private LoginRepository lrepo;
	@Autowired private student_detailsRepository srepo;
	@Autowired private faculty_detailsRepository frepo;
	@Autowired private FilesRepository flrepo;
	@Autowired private NewclassesRepository ncrepo;
	@Autowired private AssignmentsRepository asrepo;
	@Autowired private SubjectsRepository sbrepo;
	@Autowired private AssiansRepository ansrepo;
	@Autowired private SubcodesRepository screpo;
	
	@Override
	public List<Login> findByUsername(String username) {
		return lrepo.findByUsername(username);
	}
	@Override
	public void save(Login cb) {
		lrepo.save(cb);
	}
	@Override
	public Login checkpassword(String username, String password) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public List<Login> findAll() {
		return lrepo.findAll();
	}
	@Override
	public List<student_details> findAll1() {
		return srepo.findAll();
	}
	@Override
	public student_details findByRollnumber(String rollnumber) {
		return srepo.findByRollnumber(rollnumber);
	}
	@Override
	public student_details findByPhoneno(String phoneno) {
		// TODO Auto-generated method stub
		return srepo.findByPhoneno(phoneno);
	}
	@Override
	public student_details findByEmailid(String emailid) {
		// TODO Auto-generated method stub
		return srepo.findByEmailid(emailid);
	}
	
	@Override
	public Optional<student_details> findByIds(String id) {
		// TODO Auto-generated method stub
		return srepo.findById(id);
	}
	
	@Override
	public void save(student_details sd) {
		srepo.save(sd);
	}
	@Override
	public void save(faculty_details fd) {
		// TODO Auto-generated method stub
		frepo.save(fd);
	}
	@Override
	public List<faculty_details> findAll2() {
		// TODO Auto-generated method stub
		return frepo.findAll();
	}
	@Override
	public faculty_details findByEmailidf(String emailid) {
		// TODO Auto-generated method stub
		return frepo.findByEmailid(emailid);
	}
	
	@Override
	public Optional<faculty_details> findById(String id) {
		return frepo.findById(id);
	}
	
	/////////////////////////////////Files////////////////////////////////////////////////
	
	@Override
	public void save(Files fd,String subcode) {
		flrepo.save(fd);
		String s=fd.getId();
		Subjects sb = sbrepo.findBySubcode(subcode);
		sb.getMaterials().add(s);
		sbrepo.save(sb);
	}
	
	
	@Override
	public List<Files> getFiles(String subcode) {
		Subjects sb = sbrepo.findBySubcode(subcode);
		List<String> l=sb.getMaterials();
		List<Files> fl = new ArrayList<Files>();
		for(String i : l) {
			Optional<Files> f = flrepo.findById(i);
			Files fi = null;
			if(f.isPresent()) {
				fi=f.get();
				fl.add(fi);
			}
		}
		return fl;
	}
	
	@Override
	public String addFiles(String title, MultipartFile file, String subcode) throws IOException {
		Files photo = new Files(title); 
	    photo.setFile(new Binary(BsonBinarySubType.BINARY, file.getBytes())); 
	    photo = flrepo.insert(photo);
	    String s = photo.getId();
	    Subjects sb = sbrepo.findBySubcode(subcode);
		sb.getMaterials().add(s);
		sbrepo.save(sb);
		return photo.getId();
	}
	
	@Override
	public Files getPhoto(String id) {
		return flrepo.findById(id).get();
	}
	
	@Override
	public Optional<Files> getFileById(String id) {
		return flrepo.findById(id);
	}
	
	
	///////////////////////////////Files//////////////////////////////////////////////////
	
	@Override
	public Subjects findBySubcode(String subcode) {
		return sbrepo.findBySubcode(subcode);
	}
	
	@Override
	public List<Newclasses> findAllc() {
		return ncrepo.findAll();
	}
	
	
	@Override
	public List<Classdetails> getclassesd(String sid) {
		// TODO Auto-generated method stub
		List<Classdetails> c=new ArrayList<Classdetails>();
		Optional<student_details> s= srepo.findById(sid);
		student_details sd=null;
		Subjects sb=null;
		if(s.isPresent()) {
			sd=s.get();
			List<String> r=sd.getClassesenrolled();
			for(String i:r) {
				Classdetails cd=new Classdetails();
				cd.setSubcode(i);
				sb=sbrepo.findBySubcode(i);
				if(sb!=null) {
				cd.setSubname(sb.getSubname());
				Optional<faculty_details> f =frepo.findById(sb.getFacultyid());
				if(f.isPresent()) {
					faculty_details fd=f.get();
					cd.setName(fd.getName());
				}
				c.add(cd);
				}
			}
			
		}
		return c;
	}
	
	//getting all class details of faculty by faculty id
	@Override
	public List<FacultyClassdetails> getclassesf(String fid) {
		// TODO Auto-generated method stub
		List<FacultyClassdetails> fcd = new ArrayList<FacultyClassdetails>();
		
		Subjects sb=new Subjects();
		Optional<faculty_details> f =frepo.findById(fid);
		faculty_details fd=null;
		if(f.isPresent()) {
			fd=f.get();
			List<String> s=fd.getClassescreated();
			
			for(String i : s) {
				FacultyClassdetails fc=new FacultyClassdetails();
				fc.setSubcode(i);
				sb=sbrepo.findBySubcode(i);
				if(sb!=null) {
				fc.setSubname(sb.getSubname());
				fc.setYearandsection(sb.getYearandsection());
				
				fcd.add(fc);
				}
			}
			
		}
		return fcd;
	}
	
	//enrolling students in a class students in a class
	@Override
	public Boolean update(Subjects nc, String subcode) throws NullPointerException {
		 String k=nc.getSubstuds().get(0);
		 student_details s = findByRollnumber(k);
		 
		 List<String> l=s.getClassesenrolled();
		 for(String i:l) {
			 if(i.equals(subcode)) return false;
		 }
		 l.add(subcode);
		 s.setClassesenrolled(l);
		 srepo.save(s);
	     Subjects s1=findBySubcode(subcode);
		 s1.getSubstuds().add(k);
		 sbrepo.save(s1);
	     return true;
	}
	
	@Override
	public void save(Subcodes sc) {
		// TODO Auto-generated method stub
		screpo.save(sc);
	}
	
	@Override
	public List<Subcodes> findallsc() {
		// TODO Auto-generated method stub
		return screpo.findAll();
	}
	
	
	@Override
	public Subcodes findTopByOrderBySubcodeDesc() {
		// TODO Auto-generated method stub
		return screpo.findTopByOrderBySubcodeDesc();
	}
	
	//details of students in a class
	@Override
	public List<JoinedStudents> getsubstuds(String subcode) {
		List<JoinedStudents> js=new ArrayList<JoinedStudents>();
		Subjects s=findBySubcode(subcode);
		List<String> l = s.getSubstuds();
		for(String i : l) {
			JoinedStudents j=new JoinedStudents();
			student_details sd = srepo.findByRollnumber(i);
			j.setEmailid(sd.getEmailid());
			j.setName(sd.getName());
			j.setRollnumber(sd.getRollnumber());
			js.add(j);
		}
		return js;
	}
	
	//Adding materials to a subject using subcode
	@Override
	public void addmaterial(Subjects nc, String subcode) {
	     Subjects s= findBySubcode(subcode);
	     s.getMaterials().addAll(nc.getMaterials());
	     sbrepo.save(s);
	}
	
	//saving a particular assignment details using the subcode
	@Override
	public void save(Assignments as,String subcode) {
	try
	{
	asrepo.insert(as);
	}
	catch(NullPointerException e) {}
	String e=as.getId();
	Subjects s=findBySubcode(subcode);
	s.getAssignment().add(e);
	sbrepo.save(s);
	List<String> ss=s.getSubstuds();
	int l=ss.size();
	for(String i :ss) {
	Assians a = new Assians();
	a.setAssignmentid(e);
	a.setStudid(i);
	a.setTotalmarks(as.getAssimarks());
	ansrepo.save(a);
	as.getAssians().add(a.getId());
	student_details sds = srepo.findByRollnumber(i);
	String message="A new Assignment has been posted."+as.getAssiname()+".\n Please check..";
	String subject = "Assignment Alert!";
	String to=sds.getEmailid();
	String from="justlearn123abc@gmail.com";
	sendEmail(message,subject,to,from);
	}
	asrepo.save(as);
	}
	//retreiving all assignments in the database
	@Override
	public List<Assignments> findAlll() {
		return asrepo.findAll();
	}
	
	//retrieving all the assignments of a particular subject using subject code
	@Override
	public List<Assignments> aaos(String subcode) {
		List<String> l=findBySubcode(subcode).getAssignment();
		List<Assignments> s=new ArrayList<Assignments>();
		for(String i:l) {
			Optional<Assignments> k=asrepo.findById(i);
			if(k.isPresent()) {
				s.add(k.get());
			}
		}
		return s;
	}
	
	//creating a subject 
	@Override
	public void save(Subjects sb) {
		sbrepo.save(sb);
		Optional<faculty_details> f = findById(sb.getFacultyid());
		faculty_details fd=null;
		if(f.isPresent()) {
			fd=f.get();
			fd.getClassescreated().add(sb.getSubcode());
			frepo.save(fd);
		}
		Subcodes s=new Subcodes();
		s.setSubcode(sb.getSubcode());
		screpo.save(s);
	}
	
	//
	@Override
	public List<Subjects> getclasses(String fid) {
		List < Subjects > l = new ArrayList<Subjects>();
		Optional<faculty_details> s=frepo.findById(fid);
		if(s.isPresent()) {
			faculty_details f=s.get();
			List<String> str=f.getClassescreated();
			for(String i:str) {
				l.add(findBySubcode(i));
			}
		}
		return l;
	}
	
	@Override
	public String save(Assians as) {
		ansrepo.save(as);
		String r=as.getId();
		Assignments k=null;
		Optional<Assignments> s=asrepo.findById(as.getAssignmentid());
		if(s.isPresent()) {
			k=s.get();
			k.getAssians().add(r);
		}
		asrepo.save(k);
		return r;
	}
	
	@Override
	public List<Assians> assians(String aid) {
		Assignments k=null;
		List<String> l = new ArrayList<String>();
		Optional<Assignments> s=asrepo.findById(aid);
		List<Assians> a = new ArrayList<Assians>();
		if(s.isPresent()) {
			k=s.get();
			l=k.getAssians();
		}
		for(String i:l) {
			Optional<Assians> as = ansrepo.findById(i);
			if(as.isPresent()) a.add(as.get());
		}
		return a;
	}
	
	//Assigning marks to a particular assignment ans
	@Override
	public void assignmarks(Assians as) {
		Assians k=null;
		Optional<Assians> s=ansrepo.findById(as.getId());
		if(s.isPresent()) {
			k=s.get();
			k.setMarks(as.getMarks());
			k.setVerified(true);
		}
		ansrepo.save(k);
	}
	
	//getting class details using the student_details id
	@Override
	public List<Subjects> getclassess(String sid) {
		List < Subjects > l = new ArrayList<Subjects>();
		Optional<student_details> s=srepo.findById(sid);
		if(s.isPresent()) {
			student_details f=s.get();
			List<String> str=f.getClassesenrolled();
			for(String i:str) {
				Subjects sb = findBySubcode(i);
				if(sb != null) {
					l.add(sb);
				}
				
			}
		}
		return l;
	}
	@Override
	public List<Subjects> getmaterilas(String subcode) {
		// TODO Auto-generated method stub
		return null;
	}
	/*
	@Override
	public String uploadFile(File file, String fileName) {
        BlobId blobId = BlobId.of("bucket name", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream("downloaded private key JSON file path"));
        com.google.cloud.storage.Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        //storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        //return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }
	
	@Override
	public File convertToFile(MultipartFile multipartFile, String fileName) throws FileNotFoundException, IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }
	
	@Override
	public String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }
	@Override
	public String uploadFile(File file, String fileName) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Video getVideo(String id) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String addVideo(String title, MultipartFile file) {
		// TODO Auto-generated method stub
		return null;
	}
	*/
	
	@Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFsOperations operations;
    
    @Override
    public String addVideo(String title, MultipartFile file, String subcode) throws IOException { 
        DBObject metaData = new BasicDBObject(); 
        //metaData.put("type", file.getContentType()); 
        metaData.put("title", title); 
        ObjectId id = gridFsTemplate.store(file.getInputStream(), file.getName(), file.getContentType(), metaData); 
        String s = id.toString();
        Subjects sb = sbrepo.findBySubcode(subcode);
		sb.getMaterials().add(s);
		sbrepo.save(sb);
        return s; 
    }
    
    @Override
    public Video getVideo(String id) throws IllegalStateException, IOException { 
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(id))); 
        Video video = new Video(); 
        video.setTitle(file.getMetadata().get("title").toString()); 
        video.setStream(operations.getResource(file).getInputStream());
        return video; 
    }
    
    //getting all the uploaded materials through subcode
	@Override
	public List<Stream> getAllFiles(String subcode) {
		Subjects sb = sbrepo.findBySubcode(subcode);
		List<String> l=sb.getMaterials();
		List<Stream> fl = new ArrayList<Stream>();
		for(String i : l) {
			GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(i))); 
	        Stream s = new Stream();
	        s.setTitle(file.getMetadata().get("title").toString()); 
	        s.setId(i);
			fl.add(s);
			}
		return fl;
	}
	
	//uploading assignment answer files
	@Override
	public String addassians(String title, MultipartFile file, String assiid, String studid) throws IOException {
		Assians as = ansrepo.findByAssignmentidStudid(assiid,studid);
		//System.out.println(as.getId());
		DBObject metaData = new BasicDBObject();  
        metaData.put("title", title); 
        ObjectId id = gridFsTemplate.store(file.getInputStream(), file.getName(), file.getContentType(), metaData); 
        String s = id.toString();
        Assians sb = ansrepo.findById(as.getId()).get();
		sb.getStudans().add(s);
		ansrepo.save(sb);
        return s;
	}
	
	//getting all the assignment ans
	@Override
	public List<Stream> getAlluploads(String id) {
		Assians sb = ansrepo.findById(id).get();
		List<String> l=sb.getStudans();
		List<Stream> fl = new ArrayList<Stream>();
		for(String i : l) {
			GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(i))); 
	        Stream s = new Stream();
	        s.setTitle(file.getMetadata().get("title").toString()); 
	        s.setId(i);
			fl.add(s);
			}
		return fl;
	}
//	@Override
//	public Assians findByStudid(String studid) {
//		return ansrepo.findByStudid(studid);
//	}
//	@Override
//	public List<Assians> findByStudid(String studid) {
//		// TODO Auto-generated method stub
//		return null;
//	}
	@Override
	public Listofuploads getAlluploadsof(String assiid, String studid) {
		Assians as = ansrepo.findByAssignmentidStudid(assiid,studid);
		Listofuploads l = new Listofuploads();
		l.setMarks(as.getMarks());
		l.setStudans(as.getStudans());
		return l;
	}
	
	//getting Assignment details.... with Assignmentsdetails class
	@Override
	public List<Assignmentsdetails> getassidetails(String studid,String subcode) {
		List<Assignmentsdetails> asd = new ArrayList<Assignmentsdetails>();
		List<Assignments> ls = aaos(subcode);
		for(Assignments a : ls) {
			Assignmentsdetails asdd = new Assignmentsdetails();
			asdd.setAssiid(a.getId());
			asdd.setAssimarks(a.getAssimarks());
			asdd.setAssique(a.getAssique());
			asdd.setDeadline(a.getDeadline());
			//List<String> st = a.getAssians();
			Assians as =null; 
			as=ansrepo.findByAssignmentidStudid(a.getId(),studid);
			if(as != null) {
			asdd.setSmarks(as.getMarks());
			asdd.setAssians(as.getStudans());
			asd.add(asdd);
			}
		}
		return asd;
	}
	

	//deleting documents
	@Override
	public void deletestudentdetails(String sid) {
		student_details s = srepo.findById(sid).get();
		srepo.deleteById(sid);
	}
	
	@Override
	public void deletefacultydetails(String fid) {
		frepo.deleteById(fid);
	}
	
	@Override
	public void deleteclass(String subcode) {
//		Optional<Subjects> sb = sbrepo.findById(cid);
//		Subjects s=null;
//		if(sb.isPresent()) {
//			s=sb.get();
//		}
//		List<String> ls = s.getSubstuds();
		sbrepo.deleteBySubcode(subcode);
	}
	//unenroll a student from a class
	@Override
	public void leaveclass(String subcode,String sid) {
	Subjects sb = findBySubcode(subcode);
	if(sb!=null) {
	if(sb.getSubstuds().contains(sid)) {
	sb.getSubstuds().remove(sid);
	}
	sbrepo.save(sb);
	}
	Optional<student_details> sd = srepo.findById(sid);
	student_details s = new student_details();
	if(sd.isPresent()) {
	s=sd.get();
	s.getClassesenrolled().remove(subcode);
	srepo.save(s);
	}

	}
	
	//updating student phone number
	@Override
	public void updatePhonenumbers(student_details sd) {
	Optional<student_details> stu = srepo.findById(sd.getId());
	student_details s = new student_details();
	if(stu.isPresent()) {
	s=stu.get();
	s.setPhoneno(sd.getPhoneno());
	srepo.save(s);
	}
	}

	//updating faculty phone number
	@Override
	public void updatePhonenumberf(faculty_details fd) {
	Optional<faculty_details> stu = frepo.findById(fd.getId());
	faculty_details s = new faculty_details();
	if(stu.isPresent()) {
	s=stu.get();
	s.setPhonenumber(fd.getPhonenumber());
	frepo.save(s);
	}
	}
	
	//OTP generation code
		static char[] OTP(int len)
	    {
	        String numbers = "0123456789";
	        Random rndm_method = new Random();
	        char[] otp = new char[len];
	        for (int i = 0; i < len; i++)
	        {
	            otp[i] =
	             numbers.charAt(rndm_method.nextInt(numbers.length()));
	        }
	        return otp;
	    }
		
		//generating otp and sending mail
		@Override
		public String generateotp(Login cb) {
			List<Login> l = lrepo.findByUsername(cb.getUsername());
			int k= l.size();
			System.out.println(k);
			if(k==0) return "Email id does not exist";
			char[] otp = OTP(6);
			String onetimepassword = String.valueOf(otp);
			String message="Your One Time Password for resetting your password is:  "+onetimepassword+".\nEnter this otp in the given box to reset your account password.";
			String subject = "Password Resetting";
			String to=cb.getUsername();
			String from="justlearn123abc@gmail.com";
			sendEmail(message,subject,to,from);
			return onetimepassword;
		}
		
		//method to send mail to mail address from a mail address
		public final void sendEmail(final String message, final String subject, final String to, final String from) {
		    String host = "smtp.gmail.com";
		    Properties properties = System.getProperties();
		    //System.out.println("PROPERTIES "+properties);
		    //setting important information to properties object
		    //host set
		    properties.put("mail.smtp.host", host);
		    properties.put("mail.smtp.port", "465");
		    properties.put("mail.smtp.ssl.enable", "true");
		    properties.put("mail.smtp.auth", "true");
		    //Step 1: to get the session object..
		    Session session = Session.getInstance(properties, new Authenticator() {
		      @Override
		      protected PasswordAuthentication getPasswordAuthentication() {
		        return new PasswordAuthentication(<emailid>, <password>);
		      }
		    });
		    //session.setDebug(true);
		    //Step 2 : compose the message [text,multi media]
		    MimeMessage m = new MimeMessage(session);
		    try {
		    //from email
		      m.setFrom(from);
		      //adding recipient to message
		      m.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
		      //adding subject to message
		      m.setSubject(subject);
		      //adding text to message
		      final MimeBodyPart text = new MimeBodyPart();
		      text.setText(message);
		      final MimeBodyPart html = new MimeBodyPart();
		      //final MimeBodyPart html1 = new MimeBodyPart();
		      final MimeBodyPart html2 = new MimeBodyPart();
		      html.setContent("<h2 style='font-family:Gill Sans, sans-serif'> Welcome to <br> &#9889;Just Learn&#9889;</h2>", "text/html");
//		      html2.setContent("<h3 style='font-family:Gill Sans, sans-serif'>Thank you."
//		              + "Have a Great Day!&#128525;&#129304;</h3>", "text/html");
		      final MimeMultipart mp = new MimeMultipart();
		      mp.addBodyPart(html);
		      mp.addBodyPart(text);
//		      mp.addBodyPart(html2);
		      //send
		      //Step 3 : send the message using Transport class
		      m.setContent(mp);
		      Transport.send(m);
		      System.out.println("Email Sent Successfully!");
		    } catch (Exception e) {
		      e.printStackTrace();
		    }
		  }
		
		
		//resetting password
		@Override
		public void resetpassword(Login cb) {
			List<Login> l = lrepo.findByUsername(cb.getUsername());
			
			for(Login i : l) {
				System.out.println(i.getId());
				i.setPassword(cb.getPassword());
				lrepo.save(i);
			}
		}



	
}
