package pt.ua.tm.neji.usagi.indexBuilding;

import pt.ua.tm.neji.usagi.ui.Global;
import pt.ua.tm.neji.usagi.utilities.files.Row;
import pt.ua.tm.neji.usagi.utilities.files.WriteTextFile;

public class VocabVersionGrabber {
	public void grabVersion(String vocabFolder) {
		for (Row row : new ReadAthenaFile(vocabFolder + "/VOCABULARY.csv")) {
			if (row.get("vocabulary_name").contains("Standardized Vocabularies")) {
				WriteTextFile out = new WriteTextFile(Global.folder + "/vocabularyVersion.txt");
				out.writeln(row.get("vocabulary_version"));
				out.close();
			}
		}
	}
}
