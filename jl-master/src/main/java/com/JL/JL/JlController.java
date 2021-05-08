package com.JL.JL;


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity.BodyBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@SuppressWarnings("unused")
@RestController
@RequestMapping(path="/jl")
@CrossOrigin(origins="*")


public class JlController {
	
	@Autowired private JlService service;
	
	    //getting login details using username
		@GetMapping(value="getlogindetails/username/{username}")
		public List<Login> findByUsername(@PathVariable("username") String username) {
			return service.findByUsername(username);
		}
		
		//Getting login details
		@GetMapping(value="getlogindetails")
		public List<Login> list() {
			return service.findAll();
		}
		
		//saving login details
		@PostMapping(value="/savelogindetails",consumes = "application/json")
		public ResponseEntity<String> savelogin(@RequestBody Login cb) {
			if(cb.getUsername() != null) {
				if((service.findByUsername(cb.getUsername()))!=null) { return new ResponseEntity<String>("Email id already exists,Please use another email-id", HttpStatus.OK); }
				service.save(cb);
		        return new ResponseEntity<String>("Added successfully", HttpStatus.OK);
			}

	        return new ResponseEntity<String>("No email id", HttpStatus.OK);
	    }
		
		
		//checking the passwords
		@PostMapping(value="checklogindetails")
		public ResponseEntity<String> checkpassword(@RequestBody Login cb) {
			List<Login> l=service.findByUsername(cb.getUsername());
			for(Login lo:l)
			{
				String s=lo.getPassword();
				if(s.equals(cb.getPassword()))
				{
					return new ResponseEntity<String>("passwords matched", HttpStatus.OK);
				}
//				} else {
//					return new ResponseEntity<String>("passwords mismatched", HttpStatus.OK);
//				}
			}
			return new ResponseEntity<String>("passwords unmatched", HttpStatus.OK);	
		}
		
		//get student details
		@GetMapping(value="getstudentdetails")
		public List<student_details> list1() {
			return service.findAll1();
		}
		
		//saving student details
		@PostMapping(value="/savestudentdetails",consumes = "application/json")
		public ResponseEntity<String> savestudent_details(@RequestBody student_details sd) {
	        service.save(sd);
	        return new ResponseEntity<String>("Added successfully", HttpStatus.OK);
	    }
		
		@GetMapping(value="getstudentdetails/rollnumber/{rollnumber}")
		public student_details findByRollnumber(@PathVariable("rollnumber") String rollnumber) {
			return service.findByRollnumber(rollnumber);
		}
		
		//getting student details by email id
		@GetMapping(value="getstudentdetails/email/{emailid}")
		public student_details findByEmailid(@PathVariable("emailid") String emailid) {
			return service.findByEmailid(emailid);
		}
		
		//getting student details by id
		@GetMapping(value="getstudentdetails/id/{id}")
		public Optional<student_details> findById(@PathVariable("id") String id) {
			return service.findByIds(id);
		}
		
		@GetMapping(value="getfacultydetails")
		public List<faculty_details> listf() {
			return service.findAll2();
			
		}
		
		@GetMapping(value="getfacultydetails/{emailid}")
		public faculty_details findByEmailf(@PathVariable("emailid") String emailid) {
			return service.findByEmailidf(emailid);	
		}
		
		//getting faculty details by id
		@GetMapping(value="getfacultydetails/fid/{id}")
		public Optional<faculty_details> findByIdf(@PathVariable("id") String id) {
			return service.findById(id);
		}
		
		@PostMapping(value="/savefacultydetails",consumes = "application/json")
		public ResponseEntity<String> savefaculty_details(@RequestBody faculty_details fd) {
	        service.save(fd);
	        return new ResponseEntity<String>("Added successfully", HttpStatus.OK);
	    }
		
		//uploading materials
		@PostMapping("/uploadfile/subcode/{subcode}")
		public ResponseEntity<String> addFiles(@RequestBody Files fd, @PathVariable("subcode") String subcode) throws IOException {
		    service.save(fd,subcode);
		    return new ResponseEntity<String>("Uploaded successfully", HttpStatus.OK);
		}
		
		//adding a file
//				@PostMapping("/photos/add")
//				public String addPhoto(@RequestParam("title") String title, 
//				  @RequestParam("image") MultipartFile image) 
//				  throws IOException {
//					System.out.println(title);
//					System.out.println(image);
//				    String id = service.addFiles(title, image);
//				    System.out.println(id);
//				    return "redirect:/photos/" + id;
//				}
				@PostMapping("/materials/add/{subcode}")
				public String addPhoto(@RequestParam("title") String title, @RequestParam("image") MultipartFile image, @PathVariable("subcode") String subcode) throws IOException {
				    String id = service.addFiles(title, image, subcode);
				    return "Material Uploaded Successfully";
				}
//		  @PostMapping("/upload")
////		  
////		      public BodyBuilder uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
////		  
////		  
////		          System.out.println("Original Image Byte Size - " + file.getBytes().length);
////		  
////		          Files img = new Files(file.getOriginalFilename());
////		  
////		          service.save(img);
////		  
////		          return ResponseEntity.status(HttpStatus.OK);
////		  
////		      }

		
		//Retrieving materials of a class
		@GetMapping("/files/subcode/{subcode}")
		public List<Files> getFiles(@PathVariable("subcode") String subcode) {
		    return service.getFiles(subcode);
		}
		
		@GetMapping("/photos/{id}")
		public String getPhoto(@PathVariable String id, Model model) {
		    Files photo = service.getPhoto(id);
		    model.addAttribute("title", photo.getTitle());
		    model.addAttribute("image", 
		      Base64.getEncoder().encodeToString(photo.getFile().getData()));
		    return "photos";
		}
		
	@GetMapping("files/{id}")
    @ResponseBody
    public ResponseEntity<Object> serveFile(@RequestParam("id") String id) throws UnsupportedEncodingException {

        Optional<Files> file = service.getFileById(id);

        if (file.isPresent()) {
            return ResponseEntity.ok().body(file.get().getFile().getData());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File was not found");
        }
        }
		
		@GetMapping(value="getclassdetails")
		public List<Newclasses> findAllc() {
			return service.findAllc();
		}
		
		@GetMapping(value="getsubjectdetails/{subcode}")
		public Subjects findBySubcode(@PathVariable("subcode") String subcode) {
			return service.findBySubcode(subcode);
		}
		
		@GetMapping(value="getsubjectdetailsf/{fid}")
		public List<Subjects> getsubd(@PathVariable("fid") String fid) {
			return service.getclasses(fid);
		}
		
		@GetMapping(value="getsubjectdetailss/{sid}")
		public List<Subjects> getsubds(@PathVariable("sid") String sid) {
			return service.getclassess(sid);
		}
		
		//getting class details
		@GetMapping(value="getclassdetails/{sid}")
		public List<Classdetails> getclassds(@PathVariable("sid") String sid) {
			return service.getclassesd(sid);
		}
		
		//getting all classes created by a faculty
		@GetMapping(value="getfacultyclasses/{fid}")
		public List<FacultyClassdetails> getclassdf(@PathVariable("fid") String fid) {
			return service.getclassesf(fid);
		}
		
		@PostMapping(value="/savesubjectdetails",consumes = "application/json")
		public ResponseEntity<String> savesubjectdetails(@RequestBody Subjects subd) {
	        service.save(subd);
	        return new ResponseEntity<String>("Added successfully", HttpStatus.OK);
	    }
		
		@PutMapping(value="/joinstudents/{subcode}",consumes = "application/json")
		public ResponseEntity<String> update(@RequestBody Subjects cb,@PathVariable("subcode") String subcode) throws NullPointerException {
			Subjects s1 = new Subjects();
			s1=service.findBySubcode(subcode);
			if(s1==null) return new ResponseEntity<String>("No Class available", HttpStatus.OK);
				boolean s=service.update(cb, subcode);
			    if(s) {
			    	return new ResponseEntity<String>("Updated successfully", HttpStatus.OK);  
			}
			    else return new ResponseEntity<String>("Already enrolled", HttpStatus.OK);
		}
		
		@GetMapping(value="getclasscodes")
		public Subcodes getclassdcodes() {
			return service.findTopByOrderBySubcodeDesc();
		}
		
		//get student details of a subject
		@GetMapping(value="getsubjectstudents/{subcode}")
		public List<JoinedStudents> getsubstuds(@PathVariable("subcode") String subcode) {
			return service.getsubstuds(subcode);
		}
		
		@PutMapping(value="/addmaterials/{subcode}",consumes = "application/json")
		public ResponseEntity<String> addMaterials(@RequestBody Subjects cb,@PathVariable("subcode") String subcode) throws NullPointerException {
				service.addmaterial(cb, subcode);
				return new ResponseEntity<String>("Updated successfully", HttpStatus.OK);
		}
		
		@GetMapping(value="getmaterials/{subcode}")
		public List<Subjects> getmaterials(@PathVariable("subcode") String subcode) {
			return service.getmaterilas(subcode);
		}
		
		
		@PostMapping(value="/saveAssignmentdetails/{subcode}",consumes = "application/json")
		public ResponseEntity<String> saveassi_details(@RequestBody Assignments fd,@PathVariable("subcode") String subcode) {
	        service.save(fd,subcode);
	        return new ResponseEntity<String>("Added successfully", HttpStatus.OK);
	    }
		
		
		@GetMapping(value="/getallassignments")
		public List<Assignments> findAlll() {
			return service.findAlll();
		}
		
		@GetMapping(value="/getallassignmentsofsub/{subcode}")
		public List<Assignments> aaos(@PathVariable("subcode") String subcode) {
			return service.aaos(subcode);
		}
		
		@PostMapping(value="/saveassians",consumes = "application/json")
		public ResponseEntity<String> saveassians(@RequestBody Assians as) {
	        String s=service.save(as);
	        return new ResponseEntity<String>(s, HttpStatus.OK);
	    }
		
//		@GetMapping("/getallfiles/{subcode}")
//		public List<Stream> getallFiles(@PathVariable String subcode) throws Exception {
//		   return service.getAllFiles(subcode);  
//		}
//
//		//getting all the student uploads
//		@GetMapping("/getalluploads/{id}")
//		public List<Stream> getalluploads(@PathVariable String id) throws Exception {
//		   return service.getAlluploads(id);  
//		}

//		//saving a student upload
//		@PostMapping("/assians/add/{assiid}")
//		public String addassians(@RequestParam("title") String title, @RequestParam("studid") String studid,
//		 @RequestParam("file") MultipartFile file, Model model,@PathVariable("assiid") String assiid) throws IOException {
//		   String id = service.addassians(title, file, assiid, studid);
//		   return "redirect:/files/" + id;
//		}

		
		@GetMapping(value="/getallassiansofassi/{aid}")
		public List<Assians> aaoa(@PathVariable("aid") String aid) {
			return service.assians(aid);
		}
		
		@PutMapping(value="/addmarks",consumes = "application/json")
		public ResponseEntity<String> assignmarks(@RequestBody Assians cb) throws NullPointerException {
				service.assignmarks(cb);
				return new ResponseEntity<String>("Updated successfully", HttpStatus.OK);
		}
		
		@PostMapping("/addfiles/add/{subcode}")
		public String addVideo(@RequestParam("title") String title,
		 @RequestParam("file") MultipartFile file, Model model,@PathVariable("subcode") String subcode) throws IOException {
		   String id = service.addVideo(title, file, subcode);
		   return "Material Uploaded Successfully";
		   		
		} 
		//getting all files uploaded by a student with student id and assignment id
				@GetMapping("/getalluploads/{assiid}/{studid}")
				public Listofuploads getalluploadsofs(@PathVariable("assiid") String assiid,@PathVariable("studid") String studid) throws Exception {
				    return service.getAlluploadsof(assiid,studid);  
				}


				//deleting files
				
				//deleting student details using student id
				@DeleteMapping("/deletestudentdetails/sid/{sid}")
				public void deletestudentdetails(@PathVariable("sid") String sid)  {
						    service.deletestudentdetails(sid);
						}
				
				//deleting faculty information using faculty id
				@DeleteMapping("/deletefacultydetails/fid/{fid}")
				public void deletefacultydetails(@PathVariable("fid") String fid)  {
						    service.deletefacultydetails(fid);
						}
				
				//deleting a class using subcode 
				@DeleteMapping("/deleteclass/subcode/{subcode}")
				public ResponseEntity<String> deleteclass(@PathVariable("subcode") String subcode)  {
						    service.deleteclass(subcode);
			    return new ResponseEntity<String>("Classroom deleted", HttpStatus.OK);
						}


		//Assignmentdetails...
		@GetMapping("/getassignmentdetails/{studid}/{subcode}")
		public List<Assignmentsdetails> getallassidetails(@PathVariable("studid") String studid,@PathVariable("subcode") String subcode) throws Exception {
		    return service.getassidetails(studid,subcode);  
		}

		@GetMapping("/getfiles/{id}")
		public String getVideo(@PathVariable String id, Model model) throws Exception {
		    Video video = service.getVideo(id);
		    model.addAttribute("title", video.getTitle());
		    model.addAttribute("url", "/videos/stream/" + id);
		    return "videos";
		}
		
		@GetMapping("/files/stream/{id}")
		public void streamVideo(@PathVariable String id, HttpServletResponse response) throws Exception {
		    Video video = service.getVideo(id);
		    FileCopyUtils.copy(video.getStream(), response.getOutputStream());        
		}
		@GetMapping("/getallfiles/{subcode}")
		public List<Stream> getallFiles(@PathVariable String subcode) throws Exception {
		   return service.getAllFiles(subcode);  
		}
		

		//getting all the student uploads
		@GetMapping("/getalluploads/{id}")
		public List<Stream> getalluploads(@PathVariable String id) throws Exception {
		    return service.getAlluploads(id);  
		}
		
		@PostMapping("/assians/add/{assiid}")
		public String addassians(@RequestParam("title") String title, @RequestParam("studid") String studid,
		  @RequestParam("file") MultipartFile file, Model model,@PathVariable("assiid") String assiid) throws IOException {
		    String id = service.addassians(title, file, assiid, studid);
		    return "Assignment uploaded Successfully.";
		}
		
		//Unenrolling a student from a class
		@DeleteMapping("/leaveoff/subcode/{subcode}/{sid}")
		public ResponseEntity<String> leaveclass(@PathVariable("subcode") String subcode, @PathVariable("sid") String sid)  {
		   service.leaveclass(subcode,sid);
		   return new ResponseEntity<String>("Successfully left off", HttpStatus.OK);
		}
		
		//updating phone number with student id
		@PutMapping(value="/phonenumbers/sid",consumes = "application/json")
		public ResponseEntity<String> updatePhonenumbers(@RequestBody student_details sd) {
		service.updatePhonenumbers(sd);
		return new ResponseEntity<String>("Phoneno Updated successfully", HttpStatus.OK);
		}

		//updating phone number with faculty id
		@PutMapping(value="/phonenumberf/fid",consumes = "application/json")
		public ResponseEntity<String> updatePhonenumberf(@RequestBody faculty_details fd) {
		service.updatePhonenumberf(fd);
		return new ResponseEntity<String>("Phoneno Updated successfully", HttpStatus.OK);
		}
		
		//generating otp
				@PostMapping(value="/generateotp")
				public ResponseEntity<String> GenerateOTP(@RequestBody Login cb) {
					String otp=service.generateotp(cb);
					System.out.println(otp);
					return new ResponseEntity<String>(otp, HttpStatus.OK);	
				}
				
				//resetting new password
				@PostMapping(value="/resetpassword", consumes="application/json")
				public ResponseEntity<String> ResetPassword(@RequestBody Login cb) {
					service.resetpassword(cb);
					return new ResponseEntity<String>("Password resetted successfully", HttpStatus.OK);	
				}
		/*
		
		//filessssssssssss///
		  @PostMapping("/profile/pic")
		    public Object upload(@RequestParam("file") MultipartFile multipartFile) {
		        logger.info("HIT -/upload | File Name : {}", multipartFile.getOriginalFilename());
		        return service.upload(multipartFile);
		    }

		    @PostMapping("/profile/pic/{fileName}")
		    public Object download(@PathVariable String fileName) throws IOException {
		        logger.info("HIT -/download | File Name : {}", fileName);
		        return service.download(fileName);
		    }
		
		*/
		
}


